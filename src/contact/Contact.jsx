import React from 'react'
import './contact.css'
import Pageheader from '../component/pageheader/Pageheader'
import { IoLocation } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Contact = () => {
  return (
    <>
    <Pageheader title='Contact Us' subtitle='Contact Us' />
    <div className="contact">
    <h1>Contact us</h1>
    <div className="responsive-map">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6999582.115046629!2d-105.36848686254606!3d31.060649234788265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864070360b823249%3A0x16eb1c8f1808de3c!2sTexas!5e0!3m2!1sen!2sus!4v1735050734637!5m2!1sen!2sus" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    <div className="contact-body">
    <form className='contact-form'>
      <input type="text" placeholder="Name" required />
      <input type="email" placeholder="Email" required />
      <input type="text" placeholder="Subject" required />
      <textarea cols={4} rows={4} placeholder="Message" required></textarea>
      <button type="submit">Send</button>
    </form>
    <div className="contact-details">
      <h2>Contact Details</h2>
      <p><IoLocation />: 123 Main St, City, ST 12345</p>
      <p><FaPhoneAlt />: (123) 456-7890</p>
      <p><MdEmail />: info@example.com</p>
    </div>
    </div>
    </div>
    </>
  )
}

export default Contact