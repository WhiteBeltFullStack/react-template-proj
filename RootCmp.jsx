// import React from "react"
import { Home } from './pages/Home.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { About } from './pages/About.jsx'

const { useState } = React

export function App() {
  const [page, setPage] = useState('books')

  function onSetPage(page) {
    setPage(page)
  }

  return (
    <section className="app">
      <AppHeader onSetPage={onSetPage} />

      <main className="main-layout">
        {page === 'books' && <BookIndex />}
        {page === 'home' && <Home />}
        {page === 'about' && <About />}
      </main>
    </section>
  )
}
