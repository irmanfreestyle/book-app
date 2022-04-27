import Link from 'next/link'

import Chip from '/components/Chip'

export default function Home() {
  return (
    <div className="app-wrapper py-5 px-3">
      <div className='text-center bg-info p-4 rounded-3'>
        <img
          src="/assets/images/book_banner.svg"
          alt="Book Banner"
          style={{width: '300px', maxWidth: '70%'}}
        />
      </div>

      <h4 className='py-3'>Explore Categories</h4>

      <div className='d-flex flex-wrap justify-content-center gap-2'>
        <Link href="category/2">
          <a>
            <Chip icon="adjust" text="Motivation" />
          </a>
        </Link>
        {/* <Link href="category/2">
          <Chip text="Self Learning" />
        </Link>
        <Link href="category/2">
          <Chip text="Sport" />
        </Link>
        <Link href="category/2">
          <Chip text="Personal Development" />
        </Link> */}
      </div>
    </div>
  )
}
