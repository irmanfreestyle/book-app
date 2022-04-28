import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import ListBooks from '/components/ListBook'
import markedBooks from '/helpers/markedBooks.js'

export default () => {
  const router = useRouter()
  const [books, setBooks] = useState([])

  function Empty() {
    return (
      <div className='text-center'>
        You have no collections!
      </div>
    )
  }

  useEffect(() => {
    setBooks(markedBooks())
  }, [])

  return (
    <>
      <div className='sticky-top bg-white pb-2' style={{zIndex: '99999'}}>
        <div className='d-flex align-items-center gap-2'>
          <i className='material-icons hoverable' onClick={() => router.back()}>keyboard_backspace</i>
          <h6 className='py-3 mb-0'>Your Collections</h6>
        </div>
      </div>

      <div className='row mt-4'>
        <ListBooks books={books} />
        { !books.length && <Empty /> }
      </div>
    </>
  )
}