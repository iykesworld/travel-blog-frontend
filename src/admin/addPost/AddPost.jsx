import React, { useEffect, useRef, useState } from "react";
import "./AddPost.css";
import { useSelector } from "react-redux";
import EditorJS from "@editorjs/editorjs";
import EditorjsList from '@editorjs/list';
import Header from '@editorjs/header';
import { usePostBlogMutation } from "../../redux/features/blog/blogsApi";
import { useNavigate } from "react-router";

const AddPost = () => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const [postBlog, {isLoading}] = usePostBlogMutation();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
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
    });
    return ()=>{
        editor.destroy();
        editorRef.current = null;
    }
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const content = await editorRef.current.save();
        const newPost = {
            title,
            coverImg,
            description: metaDescription,
            category,
            rating,
            content,
            author: user._id,
        }
        // console.log(newPost);
        const response =await postBlog(newPost).unwrap();
        console.log(response);
        alert('Blog is posted successfully');
        navigate('/');
    } catch (error) {
        console.log('Failed to submit post');
        setMessage('Failed to submit post, please try again');
    }
    
  }
  return (
    <div className="addpost">
      <h3>Create a New Blog Post</h3>
      <form onSubmit={handleSubmit} className="addpost-form">
        <div className="addpost-form-title">
          <label>Blog Title</label>
          <input
          className="adpost-form-title-input"
            type="text"
            placeholder="Enter blog title...."
            required
            value={title}
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
                value={coverImg}
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
                value={category}
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
                value={metaDescription}
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
                value={rating}
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
        <button disabled = {isLoading} className="addpost-form-btn" type="submit">Add New Blog</button>
      </form>
    </div>
  );
};

export default AddPost;
