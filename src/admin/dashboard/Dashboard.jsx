import React, { useState } from 'react'
import './Dashboard.css';
import { useSelector } from 'react-redux';
import { HiUsers } from "react-icons/hi";
import { FaBlog } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { FaComment } from "react-icons/fa";
import { useFetchBlogsQuery } from '../../redux/features/blog/blogsApi';
import { useGetCommentsQuery } from '../../redux/features/comment/commentApi';
import { useGetUserQuery } from '../../redux/features/auth/authApi';
import BlogsCharts from './BlogsCharts';

const Dashboard = () => {
    const {user} = useSelector((state)=> state.auth);
    const [query, setQuery]= useState({search: '', category: ''});

    const {data: blogsData, error: blogsError, isLoading: blogsLoading} = useFetchBlogsQuery(query);
    const blogs = Array.isArray(blogsData?.blogs) ? blogsData.blogs : [];

    const {data: commentsData = {}} = useGetCommentsQuery();
    const totalComments = commentsData?.totalComment || 0;

    const {data: usersData = {}} = useGetUserQuery();
    const userList = Array.isArray(usersData?.users) ? usersData.users : [];
  const adminCount = userList.filter((user) => user.role === "admin").length;
  const userCount = userList.length;
    
  return (
    <div className='dashboard'>
        {blogsLoading && <div>Loading....</div>}
        <div className='dashboard-top'>
            <h1>Hi, {user?.username} </h1>
            <p>Welcome to the admin dashboard</p>
            <p>Here you can manage your blog post, manage rooms and other administrative tasks</p>
        </div>
        {/* card grid */}
        <div className='dashboard-grid'>
            <div className='dasboard-grid-content'>
            <HiUsers className='dashboard-grid-icon icone-one' />
            <p>{userCount} User{userCount > 1 && 's'}</p>
            </div>
            <div className='dasboard-grid-content'>
            <FaBlog className='dashboard-grid-icon icone-two' />
            <p>{blogs.length} Blog{blogs.length > 1 && "s"}</p>
            </div>
            <div className='dasboard-grid-content'>
            <RiAdminLine className='dashboard-grid-icon icone-three' />
            <p>{adminCount} Admin{adminCount > 1 && 's'}</p>
            </div>
            <div className='dasboard-grid-content'>
            <FaComment className='dashboard-grid-icon icone-four' />
            <p>{totalComments} Comment{totalComments > 1 && "s"}</p>
            </div>
        </div>
        {/* charts */}
        <div>
            <BlogsCharts blogs={blogs}/>
        </div>
    </div>
  )
}

export default Dashboard