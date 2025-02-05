import { CarPreview } from './CarPreview.jsx'

export function BookList({ books }) {


    
  return (
    <section>
      <h2>Book List</h2>
      <ul className="book-list">
        {books.map((book) => (
          <li className="book-card" key={book.id}>
            <CarPreview book={book}/>

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
