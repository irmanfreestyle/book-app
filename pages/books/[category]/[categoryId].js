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
      <div className='d-flex align-items-center gap-2'>
        <i className='material-icons hoverable' onClick={() => router.back()}>keyboard_backspace</i>
        <h6 className='py-3 mb-0'>{ category }</h6>
      </div>

      <div className='row'>
        <div className='col-6 col-sm-9'>
          <input type="text" className="form-control mb-3" placeholder={`Search book on ${category}`} />
        </div>
        <div className='col'>
          <select className="form-select form-select-md" aria-label=".form-select-sm example">
            <option value="1">
              Sort
            </option>
            <option value="3">Title A - Z</option>
            <option value="4">Title Z - A</option>
          </select>
        </div>
      </div>

      <div className='row no-gutters'>
        <ListBooks />
      </div>
    </>
  )
}