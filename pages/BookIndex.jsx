// import React from 'react'
import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from '../pages/BookDetails.jsx'

const { useState, useEffect } = React

export function BookIndex() {
  const [books, setBooks] = useState(null)

  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter)
  const [selectedBookId, setSelectedBookId] = useState(null)

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookService.query(filterBy).then((books) => setBooks(books))
  }

  function onSetSelectedBookId(id) {
    console.log('id:', id)
    setSelectedBookId(id)
  }

  function onRemoveBook(id) {
    bookService
      .remove(id)
      .then(() =>
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id))
      )
  }

  if (!books) return 'Loading Data...'
  return (
    <section>
      <h1>Book Index!</h1>

      {selectedBookId ? (
        <BookDetails
          onSetSelectedBookId={onSetSelectedBookId}
          selectedBookId={selectedBookId}
        />
      ) : (
        <BookList
          books={books}
          onRemoveBook={onRemoveBook}
          onSetSelectedBookId={onSetSelectedBookId}
        />
      )}
    </section>
  )
}
