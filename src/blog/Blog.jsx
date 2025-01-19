import React, { useEffect, useState } from "react";
import "./Blog.css";
import SearchBlog from "./SearchBlog";
import { useFetchBlogsQuery } from "../redux/features/blog/blogsApi";
import { Link } from "react-router-dom";
import Pagination from "../component/pagination/Pagination";

const Blog = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);
  const [query, setQuery] = useState({
    search: "",
    category: "",
    page: currentPage,
    limit: postsPerPage,
  });
  // get data using redux
  const { data, error, isLoading } = useFetchBlogsQuery(query);

  // destructure Api response
  const blogs = data?.blogs || [];
  const total = data?.totalPosts || 0;
  const totalPages = data?.totalPages || 1;

  // Update query when filters or page change
  useEffect(() => {
    setQuery({ search, category, page: currentPage, limit: postsPerPage });
  }, [search, category, currentPage, postsPerPage]);

  // handle Pagination
  const paginate = (pageNumber)=>{
    if(pageNumber !== currentPage){
      setCurrentPage(pageNumber);
    }
  };

  // const startIndex = (currentPage - 1) * postsPerPage + 1;
  // const endIndex = Math.ceil(currentPage * postsPerPage, total);
  

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSearch = () => {
    setCurrentPage(currentPage);
    setQuery({ search, category, page: 1, limit: postsPerPage });
  };
  return (
    <div className="blog">
      <SearchBlog
        search={search}
        handleSearchChange={handleSearchChange}
        handleSearch={handleSearch}
      />
      {isLoading && <div>Loading...</div>}
      {error && (
        <div>
          {error.data?.message || error.error || "An unexpected error occurred."}
        </div>
      )}
      <div className="blogs-post">
      {blogs.length === 0 && !isLoading && <div>No blogs found.</div>}
        {
            blogs.map(blog =>{
                return <Link to={`/blogs/${blog._id}`} className="blogs-post-content" key={blog._id}>
                    <div className="blog-image-container">
                    <img src={blog.coverImg} alt="blog image" />
                    </div>
                    <h2>{blog.title}</h2>
                </Link>
            })
        }
      </div>
      <Pagination 
      postsPerPage={postsPerPage}
      total={total}
      paginate={paginate}
      currentPage={currentPage}
      />
    </div>
  );
};

export default Blog;
