import React from 'react';
import './Pageheader.css';

const Pageheader = ({title, subtitle}) => {
  return (
    <div className='pageheader'>
        <h1>{title}</h1>
        <p>{subtitle}</p>
    </div>
  )
}

export default Pageheader