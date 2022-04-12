import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AlertComponent from '../Component/AlertComponent'
export default function LoginScreen() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [msg, setmsg] = useState('')
    const HandleLogin = () => {
        axios.post('/api/user/login', { email, password })
            .then(res => {
                localStorage.setItem('token', res.data.token)
                window.location.href = '/'
            })
            .catch(err => {
                if (err)
                    setmsg('wrong email/password')
            })
    }
    return (
        <div className="dash-container">
            {msg && <AlertComponent msg={ msg}/>}
            <h2>Login</h2>
            <input placeholder="Email" type="email" value={email} onChange={e => setemail(e.target.value)} />
            <input placeholder="Password" type="password" value={password} onChange={e => setpassword(e.target.value)} />
            <button className="btn btn-info" onClick={HandleLogin}>Login</button>
            <Link to="register">Create new account</Link>
        </div>
    )
}
