import { BookPreview } from './BookPreview.jsx'

const { Link, NavLink } = ReactRouterDOM

export function BookList({ books, onRemoveBook }) {
  return (
    <section>
      <h2>Book List</h2>
      <ul className="book-list">
        {books.map((book) => (
          <li className="book-card" key={book.id}>
            <BookPreview book={book} />

            <section>
              <button onClick={() => onRemoveBook(book.id)}>Delete</button>
              <button>
                <Link to={`/book/${book.id}`}>Details</Link>
              </button>
              <button>
                <Link to={`/book/edit/${book.id}`}>Edit</Link>
              </button>
            </section>
          </li>
        ))}
      </ul>
    </section>
  )
}
