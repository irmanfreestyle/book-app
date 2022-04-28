import { useRouter } from 'next/router'

import axios from 'axios'
import { useState, useEffect } from 'react'

import BookCard from '../../../components/BookCard'

export default () => {

  const [books, setBooks] = useState([])

  const router = useRouter()
  const { query, isReady } = router
  const { categoryId, category } = query

  async function loadBooks(page = 0, size = 10) {
    try {
      const { data } = await axios.get(`/api/books?categoryId=${categoryId}&page=${page}&size=${size}`)
      setBooks(data)
    } catch (error) {
      console.log(error)
    }
  }

  function ListBooks() {
    return books.map(book =>(
      <div key={book.id} className='col-6 col-md-4 pb-2'>
         <BookCard data={book} />
      </div>
    ))
  }

  useEffect(() => {
    if (isReady) {
      loadBooks()
    }
  }, [isReady])

  return (
    <>
      <div className='sticky-top bg-white pb-2' style={{zIndex: '99999'}}>
        <div className='d-flex align-items-center gap-2'>
          <i className='material-icons hoverable' onClick={() => router.back()}>keyboard_backspace</i>
          <h6 className='py-3 mb-0'>{ category }</h6>
        </div>

        <div className='row align-items-end mt-2'>
          <div className='col-6 col-sm-8'>
            <input type="text" className="form-control" placeholder={`Search book on ${category}`} />
          </div>
        </div>
      </div>

      <div className='row mt-4'>
        <ListBooks />
      </div>

      <div className='d-flex justify-content-center gap-3'>
        <div>
          <div className='text-center'>
            <small className='text-secondary'>Current Page</small>
          </div>
          <ul className="pagination mb-0">
            <li className="page-item">
              <a className="page-link text-secondary hoverable">
                &#8592;
              </a>
            </li>
            <li className="page-item">
              <a className="page-link text-dark" disabled>2</a>
            </li>
            <li className="page-item">
              <a className="page-link text-secondary hoverable">
                &#8594;
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className='text-center'>
            <small className='text-secondary'>Size</small>
          </div>
          <ul className="pagination mb-0">
            <li className="page-item">
              <a className="page-link text-secondary hoverable">
                &#45;
              </a>
            </li>
            <li className="page-item">
              <a className="page-link text-dark" disabled>2</a>
            </li>
            <li className="page-item">
              <a className="page-link text-secondary hoverable">
                &#43;
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}