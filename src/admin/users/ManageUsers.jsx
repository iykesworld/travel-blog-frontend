import React, { useState } from 'react'
import './ManageUsers.css'
import { useDeleteUsersMutation, useGetUserQuery } from '../../redux/features/auth/authApi'
import { useNavigate } from 'react-router';
import { CiEdit } from "react-icons/ci";
import UpdateUserModal from './UpdateUserModal';

const ManageUsers = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const {data, error, isLoading, refetch} = useGetUserQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteUsers] = useDeleteUsersMutation();
  const navigate = useNavigate();
  const handleDelete = async(id)=>{
    try {
        const response = await deleteUsers(id).unwrap();
        alert(response.message);
        refetch(); // refetch the blogs after deleting a blog to display the updated list.
    } catch (error) {
        console.error(error,'Failed to delete blog');
    }
}
const handleEdit = (user) =>{
  setSelectedUser(user);
  setIsModalOpen(true);
}
const handleCloseModal =()=>{
  setIsModalOpen(false);
  setSelectedUser(null);
}
  return (
    <div className='manageUsers'>
        {isLoading && <div>Loading.....</div>}
        <div className='manageUsers-top'>
            <h3>All Blogs</h3>
            <button>See all</button>
        </div>
        <table>
        <thead>
        <tr className='manageUsers-thead-roll'>
        <th>No</th>
        <th>User email</th>
        <th>User Role</th>
        <th>Edit or Manage</th>
        <th>Delete</th>
        </tr>
        </thead>
        <tbody>
            {
                data?.users && data.users.map((users, index)=>{
                    return (
                        <tr key={index} className='manageUsers-tablebody-roll'>
                            <th>{index+1}</th>
                            <td>{users?.email}</td>
                            {/* <td>{new Date(blog.createdAt).toLocaleDateString()}</td> */}
                            <td>{users?.role}</td>
                            <td><button onClick={()=> handleEdit(users)}  className='manageUsers-table-data-link'>
                            <span><CiEdit /> Edit</span>
                            </button></td>
                            <td><button onClick={() => handleDelete(users._id)} className='manageUsers-table-data-btn'>Delete</button></td>
                        </tr>
                    )
                })
            }
        </tbody>  
        </table>
        {isModalOpen && <UpdateUserModal user ={selectedUser} onRoleUpdate = {refetch} onClose ={handleCloseModal} />}
    </div>
  )
}

export default ManageUsers