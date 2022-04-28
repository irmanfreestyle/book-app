import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import Chip from '/components/Chip'

export default function Home() {
  // State
  const [categories, setCategories] = useState([])

  // Methods
  async function loadCategories() {
    try {
      const { data } = await axios.get('/api/categories')
      setCategories(data)
    } catch (error) {
      console.log(error)
    }
  }

  function ListCategories() {
    return categories.map(category => (
      <Link key={category.id} href={`books/${category.name}/${category.id}`}>
        <a>
          <Chip icon="adjust" text={category.name} />
        </a>
      </Link>
    ))
  }

  useEffect(() => {
    loadCategories()
  }, [])

  return (
    <>
      <div className='text-center bg-primary p-4 rounded-3'>
        <img
          src="/assets/images/book_banner.svg"
          alt="Book Banner"
          style={{width: '300px', maxWidth: '70%'}}
        />
      </div>
      <h6 className='py-3'>Explore Categories</h6>
      <div className='d-flex flex-wrap justify-content-center gap-2'>
        <ListCategories />
      </div>
    </>
  )
}
