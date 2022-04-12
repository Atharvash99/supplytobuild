import React from 'react'

export default function ProfileComponent() {
    return (
        <div className="profile-container">
            <h2 align="center">Profile setting</h2>
            <input type="text" placeholder="Change Name" />
            <input type="text" placeholder="Change Address" />
            <button className="btn btn-warning" style={{"marginTop":"2rem"}}>Update Profile</button>
        </div>
    )
}
