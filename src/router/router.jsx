
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import About from "../about/About";
import Contact from "../contact/Contact";
import Singleblog from "../blog/Singleblog";
import Login from "../user/Login";
import Register from "../user/Register";
import AdminLayout from "../admin/AdminLayout";
import Dashboard from "../admin/dashboard/Dashboard";
import AddPost from "../admin/addPost/AddPost";
import ManageItems from "../admin/manageItems/ManageItems";
import PrivateRouter from "./PrivateRouter";
import UpdatePost from "../admin/updatePost/UpdatePost";
import ManageUsers from "../admin/users/ManageUsers";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "/about",
                element: <About/>,
            },
            {
                path: "/contact",
                element: <Contact/>,
            },
            {
                path: "/blogs/:id",
                element: <Singleblog/>,
            },
            {
                path: "/login",
                element: <Login/>,
            },
            {
                path: "/register",
                element: <Register/>,
            },
            {
                path: "/dashboard",
                element: <PrivateRouter><AdminLayout/></PrivateRouter>, //it will be protected by the admin: use private route
                children: [
                    {
                        path: '',
                        element: <Dashboard/>
                    },
                    {
                        path: 'add-new-post',
                        element: <AddPost/>
                    },
                    {
                        path: 'manage-items',
                        element: <ManageItems/>
                    },
                    {
                        path: 'users',
                        element: <ManageUsers/>
                    },
                    {
                        path: 'update-items/:id',
                        element: <UpdatePost/>
                    },
                ] 
            },
        ]
    }
])

export default router;