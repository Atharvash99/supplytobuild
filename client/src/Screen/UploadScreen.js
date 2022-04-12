import React, { useState,useEffect } from 'react'
import axios from 'axios'
export default function UploadScreen() {
    const token=localStorage.getItem('token')
    useEffect(() => {
        axios.post('/api/user/isAdmin', { token: token })
            .then(res => {
                if (res.data.isAdmin!==true)
                    window.location.href='/'
            })
    }, [])
    const [name, setname] = useState('')
    const [images, setimages] = useState([])
    const [brand, setbrand] = useState('')
    const [category, setcategory] = useState('')
    const [price, setprice] = useState('')
    const [stock, setstock] = useState('')
    const HandleUpload = async() => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', price)
        formData.append('category', category)
        formData.append('stock', stock)
        formData.append('brand', brand)
        for (const key of Object.keys(images))
        {
            formData.append('images',images[key])
            }
        const token = localStorage.getItem('token')
        axios.post('/api/product/upload', formData, { headers: { token } })
        setname('')
        setbrand('')
        setprice('')
        setstock('')
        setimages('')
        setcategory('')
    }
    return (
        <>
        <div className="dash-container">
            <input placeholder="Product Name" value={name} onChange={ e=>{setname(e.target.value)}}/>
            <input placeholder="Product Brand Name" value={brand} onChange={e => { setbrand(e.target.value) }} />
            <input placeholder="Product Category" value={category} onChange={ e=>{setcategory(e.target.value)}}/>
            <input placeholder="Product Price" value={price} onChange={ e=>{setprice(e.target.value)}}/>
            <input placeholder="Product Stock" value={stock} onChange={ e=>{setstock(e.target.value)}}/>
            <label>Product Image</label> <input type="file" onChange={e => { setimages(e.target.files) }} multiple/>
            <button className="btn btn-success" onClick={HandleUpload}>Upload Product</button>
        </div></>
    )
}