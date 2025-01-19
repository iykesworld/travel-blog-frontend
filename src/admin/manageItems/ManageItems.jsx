import React, { useState } from 'react'
import './ManageItems.css';
import { useDeleteBlogMutation, useFetchBlogsQuery } from '../../redux/features/blog/blogsApi';
import { formatDate } from '../../utils/formatDate';
import { Link } from 'react-router';
import { CiEdit } from "react-icons/ci";

const ManageItems = () => {
    const [query, setQuery] = useState({search: '', category: ''});
    const {data: blogs = [], error, isLoading, refetch} = useFetchBlogsQuery(query);
    const [deleteBlog] = useDeleteBlogMutation()
    const handleDelete = async(id)=>{
        try {
            const response = await deleteBlog(id).unwrap();
            alert(response.message);
            refetch(); // refetch the blogs after deleting a blog to display the updated list.
        } catch (error) {
            console.error(error,'Failed to delete blog');
        }
    }
  return (
    <div className='manageItems'>
        {isLoading && <div>Loading.....</div>}
        <div className='manageItems-top'>
            <h3>All Blogs</h3>
            <button>See all</button>
        </div>
        <table>
        <thead>
        <tr className='thead-roll'>
        <th>No</th>
        <th>Blog name</th>
        <th>Publishing date</th>
        <th>Edit or Manage</th>
        <th>Delete</th>
        </tr>
        </thead>
        <tbody>
            {
                blogs && blogs.map((blog, index)=>{
                    return (
                        <tr key={index} className='tablebody-roll'>
                            <th>{index+1}</th>
                            <td>{blog.title}</td>
                            {/* <td>{new Date(blog.createdAt).toLocaleDateString()}</td> */}
                            <td>{formatDate(blog.createdAt)}</td>
                            <td><Link to={`/dashboard/update-items/${blog?._id}`} className='table-data-link'>
                            <span><CiEdit /> Edit</span>
                            </Link></td>
                            <td><button onClick={() => handleDelete(blog._id)} className='table-data-btn'>Delete</button></td>
                        </tr>
                    )
                })
            }
        </tbody>
        
        </table>
    </div>
  )
}

export default ManageItems