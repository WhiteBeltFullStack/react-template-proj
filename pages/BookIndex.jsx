// import React from 'react'
import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from '../pages/BookDetails.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { showSuccessMsg } from '../services/event-bus.service.js'

const { Link } = ReactRouterDOM

const { useState, useEffect } = React

export function BookIndex() {
  const [books, setBooks] = useState(null)

  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService.query(filterBy).then((books) => setBooks(books))
  }

  function onRemoveBook(id) {
    bookService
      .remove(id)
      .then(() => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id))
        showSuccessMsg('Book has been successfully removed!')
      })
      .catch(() => {
        showErrorMsg(`couldn't remove book`)
        navigate('/book')
      })
  }

  function onSetFilterBy(filterBy) {
    setFilterBy(filterBy)
  }

  if (!books) return 'Loading Data...'
  return (
    <section>
      <BookFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />
      <button>
        <Link to="/book/edit">Add Book</Link>
      </button>
      <BookList books={books} onRemoveBook={onRemoveBook} />
    </section>
  )
}
