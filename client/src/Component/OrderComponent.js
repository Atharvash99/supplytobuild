import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function OrderComponent() {
    const [orders, setorders] = useState([])
    useEffect(() => {
        const token = localStorage.getItem('token')
        console.log(token)
        axios.post("/api/order", { token })
            .then(res => { setorders(res.data.orders) })
            .catch(err => { if (err) console.log("Something whent wrong") })
    }, [])
    return (
        <>
            <h3 style={{"marginTop":"0.5rem"}}>Order product's</h3><br/>
            <table class="table"align="center">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Qty</th>
                        <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order, index) => (
                            <tr>
                                <th scope="row">{index + 1}</th>
                                <td>{ order.name}</td>
                                <td>{order.qty}</td>
                                <td>{ order.price}</td>
                        </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}
