import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onRemoveBook, onSetSelectedBookId }) {


    
  return (
    <section>
      <h2>Book List</h2>
      <ul className="book-list">
        {books.map((book) => (
          <li className="book-card" key={book.id}>
            <BookPreview book={book} />

            <section>
              <button onClick={() => onRemoveBook(book.id)}>Delete</button>
              <button onClick={() => onSetSelectedBookId(book.id)}>
                Details
              </button>
            </section>
          </li>
        ))}
      </ul>
    </section>
  )
}
