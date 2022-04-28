import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import CategoryCard from '/components/CategoryCard'
import Navbar from '/components/Navbar'
import Spinner from '/components/Spinner'

export default function Home() {
  const bannerWrapperStyles = {
    background: '#00B4DB',
    background: '-webkit-linear-gradient(to right, #0083B0, #00B4DB)',
    background: 'linear-gradient(to right, #0083B0, #00B4DB)'
  }
  // State
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Methods
  async function loadCategories() {
    try {
      setIsLoading(true)
      const { data } = await axios.get('/api/categories')
      setCategories(data)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  function ListCategories() {
    return isLoading && (
      <div className='text-center'>
        <Spinner />
      </div>
    ) ||
    categories.map(category => (
      <div key={category.id} className='col-6 col-sm-6 col-md-4 mb-4'>
        <Link href={`books/${category.name}/${category.id}`}>
          <a className='text-decoration-none'>
            <CategoryCard icon="adjust" text={category.name} />
          </a>
        </Link>
      </div>
    ))
  }

  useEffect(() => {
    loadCategories()
  }, [])

  return (
    <>
      <div className='text-center p-4 rounded-3' style={bannerWrapperStyles}>
        <img
          src="/assets/images/book_banner.svg"
          alt="Book Banner"
          style={{width: '300px', maxWidth: '70%'}}
        />
      </div>
      <h6 className='py-3'>Explore Categories</h6>
      <div className='row'>
        <ListCategories />
      </div>

      <Navbar />
    </>
  )
}
