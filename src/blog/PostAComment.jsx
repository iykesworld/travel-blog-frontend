import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { usePostCommentMutation } from '../redux/features/comment/commentApi';
import { useFetchBlogByIdQuery } from '../redux/features/blog/blogsApi';



const PostAComment = () => {
    const {id} = useParams();
    const [comment, setComment] = useState('');
    const {user} = useSelector((state)=> state.auth);
    const [postComment, { isLoading, isSuccess, isError }] = usePostCommentMutation();
    const {refetch} = useFetchBlogByIdQuery(id, {skip: !id})
    
    
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
      e.preventDefault();
      if(!user){
        alert('Please login to comment on this post');
        navigate('/login');
        return;
      }
      const newComment = {
        comment: comment,
        user: user?._id,
        postId: id
      }
      try {
        const response = await postComment(newComment).unwrap();
        alert('comment posted successfully');
        setComment('');
        refetch(); // refetch the post after comment is posted to display the new comment in the list.
      } catch (error) {
        alert('An error occured while posting comment')
      }
    }
  return (
    <div className='post-comment'>
        <h3>Leave a comment</h3>
        <form onSubmit={handleSubmit} className='post-comment-form'>
            <textarea
             name="text"
             onChange={(e)=> setComment(e.target.value)}
             cols="30"
             rows="10"
             placeholder='Share your opinion about this post'
             value={comment}>  
            </textarea>
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}

export default PostAComment