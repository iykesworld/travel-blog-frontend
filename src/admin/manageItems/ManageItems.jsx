import React, { useState } from 'react'
import './ManageItems.css';
import { useDeleteBlogMutation, useFetchBlogsQuery } from '../../redux/features/blog/blogsApi';
import { formatDate } from '../../utils/formatDate';
import { Link } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";

const ManageItems = () => {
    const [query, setQuery] = useState({search: '', category: '', page: 1});
    const {data = {}, error, isLoading, refetch} = useFetchBlogsQuery(query);
    const [deleteBlog] = useDeleteBlogMutation();

    const { blogs = [], total = 0, page = 1, totalPages = 1 } = data;
    const handleDelete = async(id)=>{
        try {
            const response = await deleteBlog(id).unwrap();
            alert(response.message);
            refetch(); // refetch the blogs after deleting a blog to display the updated list.
        } catch (error) {
            console.error(error,'Failed to delete blog');
        }
    }

    const handlePageChange = (newPage) => {
        setQuery((prev) => ({ ...prev, page: newPage }));
    };
  return (
    <div className='manageItems'>
        {isLoading && <div>Loading.....</div>}
        {error && <div className="error">Failed to fetch blogs. Please try again.</div>}
        <div className='manageItems-top'>
            <h3>All Blogs</h3>
            <button onClick={() => refetch()}>Refresh</button>
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
        {blogs.length > 0 ? (
                        blogs.map((blog, index) => (
                            <tr key={blog._id} className="tablebody-roll">
                                <th>{index + 1}</th>
                                <td>{blog.title}</td>
                                <td>{formatDate(blog.createdAt)}</td>
                                <td>
                                    <Link to={`/dashboard/update-items/${blog._id}`} className="table-data-link">
                                        <span>
                                            <CiEdit /> Edit
                                        </span>
                                    </Link>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(blog._id)}
                                        className="table-data-btn"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="no-data">
                                No blogs available
                            </td>
                        </tr>
                    )}
        </tbody>
        
        </table>

        {/* Pagination Controls */}
        <div className="pagination">
                <button
                    onClick={() => handlePageChange(query.page - 1)}
                    disabled={query.page === 1}
                >
                    Previous
                </button>
                <span>
                    Page {query.page} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(query.page + 1)}
                    disabled={query.page === totalPages}
                >
                    Next
                </button>
            </div>
    </div>
  )
}

export default ManageItems