import React, { useState } from 'react'
import './ManageUsers.css'
import { useUpdateUserRoleMutation } from '../../redux/features/auth/authApi';

const UpdateUserModal = ({user, onRoleUpdate, onClose}) => {
    const [role, setRole] = useState(user?.role);
    const [errorMessage, setErrorMessage] = useState('');
    const [updateUserRole, {isLoading}] = useUpdateUserRoleMutation();

    const handleUpdateRole = async() => {
        try {
            if (!user?._id) {
                console.error('Invalid user ID');
                setErrorMessage('Invalid user ID');
                return;
              }
            await updateUserRole({userId: user?._id, role}).unwrap();
            // console.log('Updating role for user:', user._id, 'to role:', role);
            alert('Role updated successfully');
            setErrorMessage('');
            onRoleUpdate();
            onClose();
        } catch (error) {
            console.error(error, 'Role update failed');
            setErrorMessage('Failed to update role. Please try again.');
        }
    }

  return (
    <div className='updateusermodal'>
        <div className='updateusermodal-wrapper'>
            <h2>Edit User</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div>
                <label>Email</label>
                <input type="text" value={user?.email} readOnly />
            </div>
            <div>
                <label>Role</label>
                <select value={role} onChange={(e)=> setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            <div>
                <button onClick={onClose}>Cancel</button>
                <button onClick={handleUpdateRole}>{isLoading ? 'Saving...' : 'Save'}</button>
            </div>
        </div>
    </div>
  )
}

export default UpdateUserModal