// import React from "react"
import { Home } from "./pages/Home.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"

const {useState} = React

export function App() {

    const [page, setPage] = useState('car')

    function onSetPage(page) {
        setPage(page)
    }

    return (
        <section className="app">
            <AppHeader onSetPage={onSetPage} />

            <main className="main-layout">
                {page === 'home' && <Home />}
                {page === 'about' && <About />}
                {page === 'books' && <BookIndex />}
            </main>
        </section>
    )
} 