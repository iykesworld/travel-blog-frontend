import React from 'react'
import { Outlet } from 'react-router'
import Navbar from './component/navbar/Navbar'
import Footer from './component/footer/Footer'

const App = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
    
  )
}

export default App