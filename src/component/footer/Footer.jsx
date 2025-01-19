import React from 'react'
import './Footer.css';
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from '../../assets/Travellogoimagenobg.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footerleft">
            <div className="footer-left-socials">
            <a href=""><FaFacebookF className='footer-icons-socials' /></a>
            <a href=""><FaXTwitter className='footer-icons-socials' /></a>
            </div>
            <div className="footer-left-details">
                <a href="mailto:kennethiyke12@gmail.com">Contact</a>
                <h3>Terms and Condition</h3>
            </div>
        </div>
        <div className="footer-center">
            <img src={logo} alt="" />
        </div>
        <div className="footer-right">
            <p>Site by <span>IYKES DESIGN</span></p>
        </div>
    </div>
  )
}

export default Footer