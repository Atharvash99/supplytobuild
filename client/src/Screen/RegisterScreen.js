import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AlertComponent from '../Component/AlertComponent'
export default function RegisterScreen() {
    const [name, setname] = useState("")
    const [password, setpassword] = useState('')
    const [email, setemail] = useState('')
    const [address, setaddress] = useState("")
    const [msg, setmsg] = useState('')
    const HandleRegister = () => {
        axios.post('/api/user/register', { name, email, password, address })
            .then(res => { 
                 setmsg(res.data)
              })
            .catch(err => { setmsg("Detail's are not vaild!") })
    }
    return (
        <>
            <div className="dash-container">
                {msg && <AlertComponent msg={ msg}/>}
                <h2>Register</h2>
                <input placeholder="Full Name" type="text" value={name} onChange={e => setname(e.target.value)} />
                <input placeholder="Email" type="email" value={email} onChange={e => setemail(e.target.value)} />
                <input placeholder="Address" type="text" value={address} onChange={e => setaddress(e.target.value)} />
                <input placeholder="Password" type="password" value={password} onChange={e => setpassword(e.target.value)} />
                <button className="btn btn-info" onClick={HandleRegister}>Register</button>
                <Link to="login">Already have account?</Link>
            </div>

        </>
    )
}
