import React from 'react'
import { GrUserSettings } from "react-icons/gr";
import './Admin.css'
import { NavLink } from 'react-router';
import { useLogoutUserMutation } from '../redux/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/features/auth/authSlice';

const AdminNavigation = () => {
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const handleLogout = async()=>{
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (!confirmLogout) return;
        try {
            await logoutUser().unwrap();
            dispatch(logout());
        } catch (error) {
            console.error(error, 'Failed to logout');
        }
    }
  return (
    <div className='adminNavigation'>
        {/* header */}
        <div className='admin-icon-details'>
        <GrUserSettings className="Admin-icon" />
        <p>Admin</p>
        </div>
        <hr />
        <div className='adminNavigation-list-wrappre'>
        <ul className='adminNavigation-list'>
            <li>
                <NavLink to='/dashboard' end className={({ isActive }) => (isActive ? "nav-active" : "nav-inactive")}>Dashboard</NavLink>
            </li>
            <li>
                <NavLink to='/dashboard/add-new-post' className={({ isActive }) => (isActive ? "nav-active" : "nav-inactive")}>Add New Post</NavLink>
            </li>
            <li>
                <NavLink to='/dashboard/manage-items' className={({ isActive }) => (isActive ? "nav-active" : "nav-inactive")}>Manage Items</NavLink>
            </li>
            <li>
                <NavLink to='/dashboard/users' className={({ isActive }) => (isActive ? "nav-active" : "nav-inactive")}>Users</NavLink>
            </li>
        </ul>
        <div>
            <hr />
            <button onClick={handleLogout} className='adminNavigation-button'>Logout</button>
        </div>
        </div>

    </div>
  )
}

export default AdminNavigation