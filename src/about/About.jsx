import React from 'react'
import './About.css';
import Pageheader from '../component/pageheader/Pageheader';
import about_image from '../assets/about-hero-image1.svg'
import missionImg from '../assets/mission.svg'
import purposeImg from '../assets/purpose.svg'

const About = () => {
  return (
    <>
    <Pageheader title='About Us' subtitle= 'Home | About us' />
    <div className='about'>
      <div className="about-top">
        <div className="about-top-details">
        <h2>Designer by passion, storyteller at heart.</h2>
          <p>Hi, I’m Iykes Designs, a UI/UX designer and front-end developer with a passion for crafting meaningful digital experiences. When I’m not designing interfaces, I’m sharing ideas, stories, and inspiration through this blog.</p>
        </div>
        <div className="about-top-image">
          <img src={about_image} alt="about us image" />
        </div>
      </div>
      <div className="about-purpose">
        <div className="about-purpose-image">
          <img src={purposeImg} alt="image for purpose" />
        </div>
        <div className="about-purpose-details">
        <h2>Purpose</h2>
        <p>My mission? To empower others through design, code, and creativity. Whether you’re here for a quick tip or a deep dive, I hope to spark your imagination and add value to your journey.</p>
        </div>

      </div>
      <div className="about-funfacts">
        <div className="funfacts-details">
        <h2>Fun Facts</h2>
        <ul className='funfacts-list'>
          <li>Loves: Minimalist design, coffee, and cats</li>
          <li>Favorite Design Tool: Figma.</li>
          <li>Random Fact: I coded my first website at 12!</li>
        </ul>
        </div>
        <div className="funfact-image">
          <img src={missionImg} alt="image for mission" />
        </div>
      </div>
    </div>
    </>
  )
}

export default About