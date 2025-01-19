import React from 'react'
import { MdAccountCircle } from "react-icons/md";
import { formatDate } from '../utils/formatDate';
import PostAComment from './PostAComment';
import { useSelector } from 'react-redux';

const CommentCard = ({comments}) => {
    
    const user = useSelector((state)=> state.auth.user);
  return (
    <div>
        <div>
        {
            comments?.length > 0 ? <div>
                <h3>All Comments</h3>
                <div>
                    {
                        comments.map((comment, i)=>{
                            return <div key={i} className='comments'>
                                <div className='comment-info'>
                                <MdAccountCircle className='comment-avatar'/>
                                <div className='comment-flex-right'>
                                    <p className='comment-user'>{comment?.user?.username}</p>
                                    <p>{formatDate(comment.createdAt)}</p>
                                </div>
                                </div>
                                <div className='comment-details'>
                                    <p>{comment?.comment}</p>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div> : <div>No comments Found</div>
        }
        </div>
        {/* Add comments here */}
        <PostAComment/>
    </div>
  )
}

export default CommentCard