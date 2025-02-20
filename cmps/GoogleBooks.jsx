import { bookService } from '../services/book.service.js'
import { GoogleBookList } from './GoogleBookList.jsx'
import { utilService } from '../services/util.service.js'

import { showErrorMsg } from '../services/event-bus.service.js'
import { showSuccessMsg } from '../services/event-bus.service.js'

const {useNavigate} = ReactRouterDOM

const { useState, useEffect, useRef } = React


export function GoogleBooks() {

    const [googleBookList, setGoogleBookList] = useState([])
    const [search, setSearch] = useState('')

    const searchBooksDebounce = useRef(utilService.debounce(searchBooks,1500))
    
const navigate = useNavigate()
    
    function onHandleChange(ev) {
      let { name, value, type } = ev.target
      setSearch(value)
    }

    useEffect (()=>{
        searchBooksDebounce.current(search)
    },[search])

    function searchBooks(search){
        bookService.getBooksFromGoogle(search)
        .then(books => setGoogleBookList(books))
    }

    function onSave(book){
        bookService.addGoogleBook(book)
        .then(()=> showSuccessMsg(`Book ${book.title} Added successfully`))
        .catch(() => showErrorMsg(`couldn't save book`))
        .finally(() => navigate('/book'))
        
    }

    function onSubmitForm(ev){
        ev.preventDefault()
        searchBooks(search)

    }

    console.log('googleBookList:',googleBookList)

  return (
    <section className="book-search">
      <form style={{textAlign:'center', margin:'0 auto'}} action="" onSubmit={onSubmitForm}>
        <label htmlFor="google-book">Search online:</label>
        <input
          type="text"
          id="google-book"
          value={search}
          name="title"
          placeholder="Search Here"
          onChange={onHandleChange}
        />
        <button>Search</button>
      </form>
      {googleBookList && (
        <GoogleBookList books={googleBookList} onSave={onSave} />
      )}
    </section>
  )
}
