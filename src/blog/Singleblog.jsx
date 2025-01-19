import React from 'react'
import { useParams } from 'react-router'
import { useFetchBlogByIdQuery } from '../redux/features/blog/blogsApi';
import SingleBlogCard from './SingleBlogCard';
import CommentCard from './CommentCard';
import RelatedBlogs from './RelatedBlogs';

const Singleblog = () => {
    const {id} = useParams();

    const {data: blogs, error, isLoading} = useFetchBlogByIdQuery(id);
    // console.log(blogs);
  return (
    <div className='single-blog'>
        {isLoading && <div>Loading...</div>}
        {error && <div>Something went wrong...</div>}
        {
            blogs?.post &&(
                <div className='single-blog'>
                    <div className='singl-blog-left'>
                        <SingleBlogCard blog ={blogs.post}/>
                        <CommentCard comments={blogs?.comments}/>
                    </div>
                    <div className="single-blog-right">
                    <RelatedBlogs/>
                    </div>
                    
                </div>
            )
        }
    </div>
  )
}

export default Singleblog