import React from 'react'
import { Navigate, Outlet } from 'react-router'
import AdminNavigation from './AdminNavigation'
import { useSelector } from 'react-redux'
import './Admin.css'

const AdminLayout = () => {
    const {user}= useSelector((state)=> state.auth)
    if(!user || user.role !== 'admin'){
        return <Navigate to='/login' />
    }
  return (
    <div className='adminlayout'>
        <header>
            <AdminNavigation/>
        </header>
        <main className='admin-main'>
            <Outlet/>
        </main>
    </div>
  )
}

export default AdminLayout