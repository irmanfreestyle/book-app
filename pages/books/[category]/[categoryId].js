import { useRouter } from 'next/router'

import ListBooks from '/components/ListBook'
import Spinner from '/components/Spinner'

import axios from 'axios'
import { useState, useEffect } from 'react'

export default () => {
  const [currentPage, setCurrentPage] = useState(0)
  const [currentSize, setCurrentSize] = useState(5)
  const [search, setSearch] = useState('')
  const [books, setBooks] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()
  const { query, isReady } = router
  const { categoryId, category } = query

  async function loadBooks(page, size, callback= () => {}) {
    try {
      setIsLoading(true)
      const { data, status } = await axios.get(`/api/books?categoryId=${categoryId}&page=${page}&size=${size}`)
      if (status) {
        callback()
        setBooks(data)
        setFilteredBooks(data)
      }
    } catch (error) {
      console.log('Record not found')
    }
    setIsLoading(false)
  }

  function handleSearch(e) {
    setSearch(e.target.value)
  }

  function changePage(act) {
    switch(act) {
      case 'next':
        loadBooks(currentPage + 1, currentSize, () => {
          setCurrentPage(currentPage + 1)
        })
        break
      case 'prev':
        if (currentPage > 0) {
          loadBooks(currentPage - 1, currentSize, () => {
            setCurrentPage(currentPage - 1)
          })
        }
        break
    }
  }

  function changeSize(act) {
    switch(act) {
      case 'next':
        loadBooks(currentSize, currentSize + 1, () => {
          setCurrentSize(currentSize + 1)
        })
        break
      case 'prev':
        if (currentSize > 1) {
          loadBooks(currentPage, currentSize - 1, () => {
            setCurrentSize(currentSize - 1)
          })
        }
        break
    }
  }

  useEffect(() => {
    if (isReady) {
      loadBooks(currentPage, currentSize)
    }
  }, [isReady])

  useEffect(() => {
    const keyword = search.trim().toLowerCase()

    if (!keyword.length) {
      setFilteredBooks(books)
    } else {
      setFilteredBooks(books.filter(book => {
        const byTitle = book.title.toLowerCase().search(keyword) > -1
        const byAuthors = book.authors.filter(author => author.toLowerCase().search(keyword) > -1).length

        return byTitle || byAuthors
      }))
    }
  }, [search])

  return (
    <>
      <div className='sticky-top bg-white pb-2' style={{zIndex: '99999'}}>
        <div className='d-flex align-items-center gap-2'>
          <i className='material-icons hoverable' onClick={() => router.back()}>keyboard_backspace</i>
          <h6 className='py-3 mb-0'>{ category }</h6>
        </div>

        <div className='row align-items-end mt-2'>
          <div className='col-12'>
            <input value={search} onChange={handleSearch} type="text" className="form-control" placeholder={`Search book by title or author on ${category}`} />
          </div>
        </div>
      </div>

      { (isLoading && <div className="text-center"><Spinner /></div>) }
      {
        !isLoading &&
        <div>
          <div className='row mt-4'>
            { (!isLoading && !filteredBooks.length)
              &&
            <div className='text-center py-5'>
              No record found!
            </div> }
            <ListBooks books={filteredBooks} />
          </div>

          <div className='d-flex justify-content-center gap-3'>
            <div>
              <div className='text-center'>
                <small className='text-secondary'>Current Page</small>
              </div>
              <ul className="pagination mb-0">
                <li className="page-item" onClick={() => changePage('prev')}>
                  <a className="page-link text-secondary hoverable">
                    &#8249;
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link text-dark">{ currentPage + 1 }</a>
                </li>
                <li className="page-item" onClick={() => changePage('next')}>
                  <a className="page-link text-secondary hoverable">
                    &#8250;
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className='text-center'>
                <small className='text-secondary'>Size</small>
              </div>
              <ul className="pagination mb-0">
                <li className="page-item" onClick={() => changeSize('prev')}>
                  <a className="page-link text-secondary hoverable">
                    &#45;
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link text-dark">{ currentSize }</a>
                </li>
                <li className="page-item" onClick={() => changeSize('next')}>
                  <a className="page-link text-secondary hoverable">
                    &#43;
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      }
    </>
  )
}