import React from 'react'
import heroImage1 from '../assets/Frame 372.svg'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import bagOne from '../assets/bgOne.jpg'
import bagTwo from '../assets/bgTwo.jpg'
import bagFour from '../assets/bgFour.jpg'
import heroImage2 from '../assets/smallimg1.svg'
import heroImage3 from '../assets/smallimg2.svg'



const heroData = [
    {
        bgImageURL: bagOne,
        bgImgLogo: heroImage1,
        name: 'John Drill',
        title: 'Exploring the Wonders of Hiking',
        subtitle: 'An iconic landmarks, this post unveils the secrets that make this destination a traveler\'s paradise',
        buttonText: 'Destination',
    },
    {
        bgImageURL: bagTwo,
        bgImgLogo: heroImage2,
        name: 'Ngozi Adichie',
        title: 'Exploring the Wonders of Hiking',
        subtitle: 'An iconic landmarks, this post unveils the secrets that make this destination a traveler\'s paradise',
        buttonText: 'Destination',
    },
    {
        bgImageURL: bagFour,
        bgImgLogo: heroImage3,
        name: 'Evans Egwu',
        title: 'Exploring the Wonders of Hiking',
        subtitle: 'An iconic landmarks, this post unveils the secrets that make this destination a traveler\'s paradise',
        buttonText: 'Destination',
    },

]

const Hero = () => {
  return (
    <div className='Hero'>
        <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
      >
        {
            heroData.map((item, index) => (
                <SwiperSlide key={index}>
                    <div className='Hero__wrapper' style={{ backgroundImage: `url(${item.bgImageURL})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                        <div className="hero-content">
                            <div className="hero-content-left">
                                <h4>{item.buttonText}</h4>
                                <h1>{item.title}</h1>
                                <p>{item.subtitle}</p>
                            </div>
                            <div className="hero-content-right">
                                <img src={item.bgImgLogo} alt="Logo" />
                                <p>{item.name}</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))
        }
      </Swiper>
    </div>
  )
}

export default Hero