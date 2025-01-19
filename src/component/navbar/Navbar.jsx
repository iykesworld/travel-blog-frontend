import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/travelLogo.svg";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdAccountCircle } from "react-icons/md";
import { useLogoutUserMutation } from "../../redux/features/auth/authApi";
import { logout } from "../../redux/features/auth/authSlice";
import { RiMenu4Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

const navList = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];
const Navbar = () => { 
  const [ isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = ()=> setIsMenuOpen(!isMenuOpen);
  const { user } = useSelector((state) => state.auth || {});
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();

  const handleLogout = async ()=>{
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      localStorage.removeItem('user');
      console.log("User logged out successfully and data removed from localStorage.");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to log out. Please try again.");
    }
  }

  return (
    <header className="header">
      <nav className="navlist-wrapper">
        <a href="/" className="header-logo">
          <img src={logo} alt="logo" />
        </a>
        <ul className="navlist">
          {navList.map((data, index) => {
            return (
              <li key={index}>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "nav-navlink")}
                  to={`${data.path}`}
                >
                  {data.title}
                </NavLink>
              </li>
            );
          })}
          {/* render button based on user login activity */}
          {
            user ? (
              user.role === "admin" ? (
                // admin Navigation
                <li className="user-list">
                  <MdAccountCircle className="nav-icon-dashboard" />
                <Link to="/dashboard" className="dashboard-link">
                    <button className="dashboard-link-btn">Dashboard</button>
                </Link>
                </li>
              ):
              (
                // User Navigation
            <li className="user-list">
            <MdAccountCircle className="nav-icon-dashboard" />
            <button onClick={handleLogout} className="dashboard-link-btn logout-btn">Logout</button>
            </li>
              )
            ) : (
              <li>
            <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "active" : "nav-navlink")}
            >
                Login
            </NavLink>
        </li>
            )
          }  
        </ul>
        {/* toggle menu */}
        <div className="menu-Icon">
          <button onClick={toggleMenu} className="menu-icon-btns">
            {
              isMenuOpen ? <IoMdClose className="menu-icon-icon" /> :  <RiMenu4Fill className="menu-icon-icon" />

            }
          </button>
        </div>
      </nav>
      {/* mobilr menu items */}
      {
        isMenuOpen && (
          <ul className="navlist-mobile-menu">
          {navList.map((data, index) => {
            return (
              <li key={index}>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "nav-navlink")}
                  to={`${data.path}`}
                >
                  {data.title}
                </NavLink>
              </li>
            );
          })}
          {/* render button based on user login activity */}
          {
            user ? (
              user.role === "admin" ? (
                // admin Navigation
                <li className="user-list-mobile">
                  <MdAccountCircle className="nav-icon-dashboard" />
                <Link to="/dashboard" className="dashboard-link">
                    <button className="dashboard-link-btn">Dashboard</button>
                </Link>
                </li>
              ):
              (
                // User Navigation
            <li className="user-list">
            <MdAccountCircle className="nav-icon-dashboard" />
            <button onClick={handleLogout} className="dashboard-link-btn logout-btn">Logout</button>
            </li>
              )
            ) : (
              <li>
            <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "active" : "nav-navlink")}
            >
                Login
            </NavLink>
        </li>
            )
          }  
        </ul>
        )
      }
    </header>
  );
};

export default Navbar;
