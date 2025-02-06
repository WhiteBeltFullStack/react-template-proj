import { bookService } from '../services/book.service.js'

const { useState, useEffect } = React

export function BookDetails({ onSetSelectedBookId, selectedBookId }) {
  const [book, setBook] = useState(null)

  useEffect(() => {
    loadCar()
  })

  function loadCar() {
    bookService.get(selectedBookId).then((book) => setBook(book))
  }

  if (!book) return 'Loading car ...'
  return (
    <div className="book-details">
      <div>
        <img src={book.thumbnail} alt={book.title} />
        <button onClick={() => onSetSelectedBookId(null)}>Close</button>
      </div>
      <div>
        <h2>{book.title}</h2>
        <p>
          <strong>Authors:</strong> {book.authors.join(', ')}
        </p>
        <p>
          <strong>Published:</strong> {book.publishedDate}
        </p>
        <p>
          <strong>Page Count:</strong> {book.pageCount}
        </p>
        <p>
          <strong>Categories:</strong> {book.categories.join(', ')}
        </p>
        <p>
          <strong>Description:</strong> {book.description}
        </p>
        <p>
          <strong>Price:</strong> {book.listPrice.amount}{' '}
          {book.listPrice.currencyCode}
        </p>
      </div>
    </div>
  )
}
