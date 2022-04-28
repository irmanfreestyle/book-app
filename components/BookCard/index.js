import { useState } from 'react'
import styles from './_book_card.module.scss'

import markedBooks from '/helpers/markedBooks.js'

export default ({ data }) => {
  const { cover_url, title, authors } = data
  const [marked, setIsExist] = useState(markedBooks().find(item => item.id === data.id))

  // Methods
  function onBookmark() {
    const isExist = markedBooks().find(item => item.id === data.id)

    if (!isExist) {
      localStorage.setItem('bookmarked', JSON.stringify([...markedBooks(), data]))
      setIsExist(true)
    } else {
      const newData = markedBooks().filter(item => item.id !== isExist.id)
      localStorage.setItem('bookmarked', JSON.stringify(newData))
      setIsExist(false)
    }
  }

  return (
    <div className={styles.card}>
      <i
        onClick={onBookmark}
        title={marked ? 'Remove from collections' : 'Add to collections'}
        className={`${styles['bookmark-button']} material-icons bg-white text-primary border hoverable rounded shadow`}
      >
        { marked ? 'bookmark' : 'bookmark_border' }
      </i>
      <img src={cover_url} className={`${styles['card-img']} card-img-top`} alt={title} />
      <div className="card-body p-0">
        <h5 className={styles["card-title"]}>
          {title}
        </h5>
        <p className={`${styles['card-subtitle']} text-secondary`}>{authors.join(", ")}</p>
      </div>
    </div>
  );
}