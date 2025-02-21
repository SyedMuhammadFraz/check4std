import React from 'react'
import AdminNavBar from './AdminNavBar'
import { Outlet } from 'react-router-dom'

function AdminMain() {
    return (<>
        <AdminNavBar />
        <Outlet/>
    </>
    )
}

export default AdminMain