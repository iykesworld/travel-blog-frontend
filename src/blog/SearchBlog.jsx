import React from 'react'
import './Blog.css'

const SearchBlog = ({search, handleSearchChange, handleSearch}) => {
    const handleKeyPress = (event)=>{
        if(event.key === 'Enter'){
            handleSearch()
        }
    }
  return (
    <div className='search-blog'>
        <input 
        type="text" placeholder='Travel Tips Food .........'
        value={search}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress} 
        />
        <button onClick={handleSearch} className='search-blog-button'>Search</button>
    </div>
  )
}

export default SearchBlog