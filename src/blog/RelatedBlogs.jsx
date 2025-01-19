import React from 'react'
import { Link, useParams } from 'react-router'
import { useFetchRelatedBlogsQuery } from '../redux/features/blog/blogsApi';

const RelatedBlogs = () => {
    const {id} = useParams();
    const {data: blogs = [], error, isLoading} = useFetchRelatedBlogsQuery(id);
    // console.log(blogs);
  return (
    <div>
        <h3>Related Blogs</h3>
        <hr />
        {
            blogs.length > 0 ? (<div>
                {
                    blogs.map((blog, i)=>{
                        <Link key={i}>
                            <div>
                                <img src={blog.coverImg} alt="" />
                            </div>
                        </Link>
                    })
                }
            </div>) 
            : (<div> No related blogs found</div>)
        }
    </div>
  )
}

export default RelatedBlogs