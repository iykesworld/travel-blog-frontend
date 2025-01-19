import React, { useEffect, useRef, useState } from "react";
import "../addPost/AddPost.css";
import { useSelector } from "react-redux";
import EditorJS from "@editorjs/editorjs";
import EditorjsList from '@editorjs/list';
import Header from '@editorjs/header';
import { useFetchBlogByIdQuery, usePostBlogMutation, useUpdateBlogMutation } from "../../redux/features/blog/blogsApi";
import { useNavigate, useParams } from "react-router";

const UpdatePost = () => {
    const { id } = useParams();
    const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const {data: blog={}, error, isLoading, refetch} = useFetchBlogByIdQuery(id);
  const [updateBlog] = useUpdateBlogMutation();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if(blog?.post){
        const editor = new EditorJS({
            holder: "editorjs",
            onReady: () => {
              editorRef.current = editor;
            },
            autofocus: true,
            tools: {
              header: {
                class: Header,
                inlineToolbar: true,
              },
              list: { 
                  class: EditorjsList,
                  inlineToolbar: true,
                }
            },
            data: blog.post.content,
          });
          return ()=>{
              editor.destroy();
              editorRef.current = null;
          }
    }
  }, [blog]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const content = await editorRef.current.save();
        const updatedPost = {
            title: title || blog.post.title,
            coverImg: coverImg || blog.post.coverImg,
            description: metaDescription || blog.post.metaDescription,
            category: category || blog.post.category,
            rating: rating || blog.post.rating,
            content: content || blog.post.content,
            author: user._id,
        }
        
        const response =await updateBlog({id, ...updatedPost}).unwrap();
        // console.log(response);
        alert('Blog is updated successfully');
        refetch(); // refetch the post after update to display the updated details in the dashboard.
        navigate('/dashboard');
    } catch (error) {
        console.log('Failed to submit post');
        setMessage('Failed to submit post, please try again');
    }
    
  }

  return (
    <div className="addpost">
      <h3>Edit or Update Post</h3>
      <form onSubmit={handleSubmit} className="addpost-form">
        <div className="addpost-form-title">
          <label>Blog Title</label>
          <input
          className="adpost-form-title-input"
            type="text"
            placeholder="Enter blog title...."
            required
            defaultValue={blog?.post?.title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/* blog details */}
        <div className="addpost-form-detailswrapper">
          {/* left side */}
          <div className="addpost-form-detail-left">
            <p>Content Section</p>
            <p>Write your post below here....</p>
            <div id="editorjs"></div>
          </div>

          {/* right side */}
          <div className="addpost-form-detail-right">
            <p>Choose Blog Format</p>
            {/* for images */}
            <div className="addpost-form-blogcover">
              <label>Blog Cover</label>
              <input
                type="text"
                placeholder="https://unsplash.com/photos/......."
                required
                defaultValue={blog?.post?.coverImg}
                onChange={(e) => setCoverImg(e.target.value)}
              />
            </div>
            {/* category */}
            <div>
              <label>Category</label>
              <input
                type="text"
                placeholder="Tip/Food/History/Adventure"
                required
                defaultValue={blog?.post?.category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            {/* metadescription */}
            <div>
              <label>Meta Description</label>
              <textarea
                cols={4}
                rows={4}
                type="text"
                placeholder="Write your blog meta description"
                required
                defaultValue={blog?.post?.description}
                onChange={(e) => setMetaDescription(e.target.value)}
              />
            </div>
            {/* rating */}
            <div>
              <label>Rating</label>
              <input
                type="number"
                required
                onChange={(e) => setRating(e.target.value)}
                defaultValue={blog?.post?.rating}
              />
            </div>
            {/* author */}
            <div>
              <label>Author</label>
              <input
                type="text"
                disabled
                onChange={(e) => setRating(e.target.value)}
                value={user.username}
                placeholder={`{user.username} {not editable}`}
              />
            </div>
          </div>
        </div>
        {message && <p>{message}</p>}
        <button disabled = {isLoading} className="addpost-form-btn" type="submit">Update Blog Post</button>
      </form>
    </div>
  )
}

export default UpdatePost