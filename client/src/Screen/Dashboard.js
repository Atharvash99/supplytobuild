import OrderComponent from "../Component/OrderComponent"
import ProfileComponent from "../Component/ProfileComponent"
import { useState } from "react"
export default function Dashboard() {
    return (
        <>
            <center>
                <h2>Dashboard</h2>
                <div className="dashboard-container">
                    <OrderComponent />
                </div>
            </center>
        </>
    )
}
