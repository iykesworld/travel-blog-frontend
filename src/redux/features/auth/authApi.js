import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: "http://localhost:5000/api",
        credentials: 'include' 
    }),
    endpoints: (builder)=>({
        registerUser: builder.mutation({
            query: (newUser)=>({
                url: '/auth/register',
                method: 'POST',
                body: newUser
            })
        }),
        loginUser: builder.mutation({
            query: (credentials)=>({
                url: '/auth/login',
                method: 'POST',
                body: credentials
            })
        }),
        logoutUser: builder.mutation({
            query: ()=>({
                url: '/auth/logout',
                method: 'POST',
            })
        }),
        getUser: builder.query({
            query: ()=>({
                url: '/auth/users',
                method: 'GET',
            }),
            refetchOnMount: true,
            invalidatesTags: ['User']
        }),
        deleteUsers: builder.mutation({
            query: (userId)=>({
                url: `/auth/users/${userId}`,
                method: 'DELETE',
            }),
        }),
        updateUserRole: builder.mutation({
            query: ({userId, role})=>({
                url: `/auth/users/${userId}`,
                method: 'PUT',
                body: {role},
            }),
            refetchOnMount: true,
            invalidatesTags: ['User']
        })
    }),
    
  })

  export const { useRegisterUserMutation, useLoginUserMutation, useLogoutUserMutation, useGetUserQuery, useDeleteUsersMutation, useUpdateUserRoleMutation } = authApi;

export default authApi;