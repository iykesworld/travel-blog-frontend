import React from 'react'
import { formatDate } from '../../utils/formatDate'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Dashboard.css'

const formatData = (blogs)=>{
    return blogs.map(blog => ({
        name: formatDate(blog.createdAt),
        post: blog.title.length,
        pv: blog.pageViews || 0,
        amt: blog.amt || 0
    }))
}
const BlogsCharts = ({blogs}) => {
    const data = formatData(blogs);
  return (
    <div className='blogschart'>
        <h2>Blogs Chart</h2>
        <div className='chart-wrapper'>
            <ResponsiveContainer className='responsive-chart'>
                <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis/>
                <Tooltip />
                <Area type='monotone' dataKey='post' stroke='#8884d8' fill='#8884d8' />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </div>
  )
}

export default BlogsCharts