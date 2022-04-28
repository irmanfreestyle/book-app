function markedBooks() {
  if (typeof window !== 'undefined') {
    const bookmarkedString = localStorage.getItem('bookmarked')
    const data = (bookmarkedString && JSON.parse(bookmarkedString)) || []

    return data
  }
}

export default markedBooks