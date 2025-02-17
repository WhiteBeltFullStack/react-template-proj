const Router = ReactRouterDOM.HashRouter
const { Routes, Route } = ReactRouterDOM
const { useState } = React

// import React from "react"
import { Home } from './pages/Home.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { About } from './pages/About.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { BookEdit } from './pages/BookEdit.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'

export function App() {
  return (
    <Router>
      <section className="app">
        <AppHeader />

        <main className="main-layout">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/about" element={<About />}>
              {/* <Route index element={<Gugu />}  /> 
              <Route path="" element={<Gugu />}  />
              <Route path="" element={<Gaga />}  /> */}
            </Route>

            <Route path="/book" element={<BookIndex />} />
            <Route path="/book/:bookId" element={<BookDetails />} />
            <Route path="/book/edit" element={<BookEdit />} />
            <Route path="/book/edit/:bookId" element={<BookEdit />} />
          </Routes>
        </main>
        <UserMsg/>
      </section>
    </Router>
  )
}
