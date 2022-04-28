import BookCard from '/components/BookCard'

export default function ListBooks({ books }) {
  return books.map(book =>(
    <div key={book.id} className='col-6 col-md-4 pb-2'>
       <BookCard data={book} />
    </div>
  ))
}