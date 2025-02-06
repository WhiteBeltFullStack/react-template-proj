import { bookService } from '../services/book.service.js'
import { BookCount } from '../cmps/BookCount.jsx'
import { PublishedDate } from '../cmps/PublishedDate.jsx'

const { useState, useEffect } = React

export function BookDetails({ onSetSelectedBookId, selectedBookId }) {
  const [book, setBook] = useState(null)
  const [isCheap, setIsCheap] = useState(false)

  useEffect(() => {
    if (book) {
      if (book.listPrice.amount < 20) {
        setIsCheap(true)
      } else if (book.listPrice.amount > 150) {
        setIsCheap(false)
      } else {
        setIsCheap(null)
      }
    }
  }, [book])

  useEffect(() => {
    loadBook()
  }, [selectedBookId])

  function loadBook() {
    bookService.get(selectedBookId).then((book) => setBook(book))
  }

  if (!book) return 'Loading Book ...'
  return (
    <div className="book-details">
      {book.listPrice.isOnSale && <div className="on-sale">On - Sale !!!</div>}
      <div>
        <img src={book.thumbnail} alt={book.title} />
        <button onClick={() => onSetSelectedBookId(null)}>Close</button>
      </div>
      <div>
        <h2>{book.title}</h2>
        <div>
          <strong>Authors:</strong> {book.authors.join(', ')}
        </div>
        <div>
          <PublishedDate publishedDate={book.publishedDate} />
        </div>
        <div>
          <BookCount pageCount={book.pageCount} />
        </div>
        <div>
          <strong>Categories:</strong> {book.categories.join(', ')}
        </div>
        <div>
          <strong>Description:</strong> {book.description}
        </div>
        <div>
          <strong>Price:</strong>
          <div
            className={
              isCheap === true ? 'green' : isCheap === false ? 'red' : ''
            }
          >
            {book.listPrice.amount} {book.listPrice.currencyCode}
          </div>
        </div>
      </div>
    </div>
  )
}
