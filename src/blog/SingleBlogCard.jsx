import React from 'react'
import { formatDate } from '../utils/formatDate';
import EditorJSHTML from 'editorjs-html';

const editorJSHTML = EditorJSHTML();

const SingleBlogCard = ({blog}) => {
    const {title, description, category, content, author, rating, coverImg, createdAt} = blog || {};
    const htmlContent = editorJSHTML.parse(content).join('');
    
  return (
    <>
    <div className='single-blogCard'>
        <h1>{title}</h1>
        {/* TODO: Need to change author */}
        <p>{formatDate(createdAt)} by <span>Admin</span></p>
        <div className="coverImage">
            <img src={coverImg} alt="" />
        </div>
        <div className="single-blog-details">
            <div dangerouslySetInnerHTML={{__html: htmlContent}} className='editorjsdiv'/>
            <div className="rating">
                <span>Rating: </span>
                <span>{rating} (based on 2,500 reviews)</span>
            </div>
        </div>
    </div>
    </>
  )
}

export default SingleBlogCard