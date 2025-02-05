// import React from 'react'
import { bookService } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'

const { useState, useEffect } = React

export function BookIndex() {
  const [books, setBooks] = useState(null)

  const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter)
  const [selectedBookId, setSelectedBookId] = useState(null)

useEffect(()=>{
    loadBooks()

},[filterBy])

function loadBooks(){
    bookService.query(filterBy)
    .then(books => setBooks(books))
}

    if(!books) return 'Loading Data...'
  return (
    <section>
        <h1>Book Index!</h1>
        <BookList books={books} />
        

        

    </section>
  )
}
