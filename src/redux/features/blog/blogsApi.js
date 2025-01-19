import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const blogApi = createApi({
    reducerPath: 'blogApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:5000/api',
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
          const token = getState().auth?.token;
          if (token) {
            headers.set('Authorization', `Bearer ${token}`);
          }
          return headers;
        },
        
    }),
    tagTypes: ['Blogs'],
    endpoints: (builder) => ({
      fetchBlogs: builder.query({
        query: ({search='', category='', page = 1, limit = 12}) => `/blogs?search=${search}&category=${category}&page=${page}&limit=${limit}`,
        providesTags: (result = [], error) =>
          result.posts
            ? result.posts.map(({ id }) => ({ type: 'Blogs', id })).concat([{ type: 'Blogs' }])
            : [{ type: 'Blogs' }],
        // providesTags: (result = [], error) =>
        //   result.map(({ id }) => ({ type: 'Blogs', id })).concat([{ type: 'Blogs' }]),
      }),
      fetchBlogById: builder.query({
        query: (id) => `/blogs/${id}`,
        providesTags: (result, error, id) => [{ type: 'Blogs', id }],
      }),
      fetchRelatedBlogs: builder.query({
        query: (id)=> `/blogs/related/${id}`
      }),
      postBlog: builder.mutation({
        query: (newBlog)=>({
          url: '/blogs/create-post',
          method: 'POST',
          body: newBlog,
        }),
        invalidatesTags: [{ type: 'Blogs' }],
      }),
      updateBlog: builder.mutation({
        query: ({id, ...rest})=>({
          url: `/blogs/update-post/${id}`,
          method: 'PATCH',
          body: rest,
        }),
        invalidatesTags: (result, error, {id})=> [{type: 'Blogs', id}, { type: 'Blogs' }],
      }),
      deleteBlog: builder.mutation({
        query: (id)=>({
          url: `/blogs/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: (result, error, {id})=> [{type: 'Blogs', id}, { type: 'Blogs' }]
      })
    }),
  })
  
  export const { useFetchBlogsQuery, useFetchBlogByIdQuery, useFetchRelatedBlogsQuery, usePostBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation } = blogApi;
  export default blogApi;