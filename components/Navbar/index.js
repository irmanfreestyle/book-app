import Link from 'next/link'
import styles from './_navbar.module.scss'

export default () => {
  return (
    <div className={`${styles['nav-wrapper']}`}>
      <div className={`${styles['nav-content']} shadow border p-3 mb-1`}>
        <Link href="/">
          <a className="flex-grow-1 text-primary d-flex flex-column align-items-center">
            <i className="material-icons">home</i>
            <span className='text-dark'>Home</span>
          </a>
        </Link>
        <Link href="/bookmarks">
          <a className="flex-grow-1 text-primary d-flex flex-column align-items-center">
            <i className="material-icons">collections_bookmark</i>
            <span className='text-dark'>Collections</span>
          </a>
        </Link>
      </div>
    </div>
  )
}