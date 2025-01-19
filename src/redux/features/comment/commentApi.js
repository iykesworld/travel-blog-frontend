import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentApi = createApi({
    reducerPath: "commentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://travel-blog-backend-mzab.onrender.com/api/comments",
        credentials: "include",
    }),
    tagTypes: ["Comments"],
    endpoints: (builder) => ({
        postComment: builder.mutation({
            query: (commentData) => ({
                url: "/post-comment",
                method: "POST",
                body: commentData,
            }),
            invalidatesTags: (result, error, { postId }) => [{ type: "Comments", id: postId }],
        }),
        getComments: builder.query({
            query: () => ({
                url: "/total-comments",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetCommentsQuery, usePostCommentMutation } = commentApi;
export default commentApi;
