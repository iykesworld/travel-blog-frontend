import React from 'react'
import './Pagination.css'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Pagination = ({postsPerPage, total, paginate, currentPage}) => {
    const pageNumbers = [];
    // Validate inputs and calculate total pages
  const totalPages = Math.ceil(total / postsPerPage);
  if (totalPages > 0) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  }
  return (
    <ul className='pagination'>
        <li className='page-item'>
            <button
            disabled={currentPage ===1}
            className={`page-button ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => paginate(currentPage - 1)}
            ><IoIosArrowBack /></button>
        </li>
        {
            pageNumbers.map(number => (
                <li key={number} className={`page-item ${number === currentPage? 'active': ''}`} onClick={()=>paginate(number)}>
                    <span className='page-link'>{number}</span>
                </li>
            ))
        }
        <li className='page-item'>
            <button
            disabled={currentPage === totalPages}
            className={`page-button ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={() => paginate(currentPage + 1)}
            ><IoIosArrowForward /></button>
        </li>
    </ul>
  )
}

export default Pagination