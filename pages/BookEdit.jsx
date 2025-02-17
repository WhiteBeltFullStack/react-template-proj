import { GoogleBooks } from '../cmps/GoogleBooks.jsx'
import { bookService } from '../services/book.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { showSuccessMsg } from '../services/event-bus.service.js'

const { useParams, useNavigate } = ReactRouterDOM

const { useState, useEffect } = React

export function BookEdit() {
  const [bookEdit, setBookEdit] = useState(bookService.getEmptyBook())

  const navigate = useNavigate()
  const { bookId } = useParams()

  useEffect(() => {
    if (bookId) loadCar()
  }, [bookId])

  function loadCar() {
    bookService.get(bookId).then(setBookEdit)
  }

  function onSaveBook(ev) {
    ev.preventDefault()

    bookService
      .save(bookEdit)
      .then(() => showSuccessMsg('Book has successfully saved!'))
      .catch(() => showErrorMsg(`couldn't save book`))
      .finally(() => navigate('/book'))
  }

  function onHandleChange({ target }) {
    const field = target.name
    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break

      case 'checkbox':
        value = target.checked
        break
    }
    setBookEdit((prevBookEdit) => {
      if (field === 'amount') {
        return {
          ...prevBookEdit,
          listPrice: { ...prevBookEdit.listPrice, [field]: value },
        }
      }
      return { ...prevBookEdit, [field]: value }
    })
  }

  const { title } = bookEdit
  const { amount } = bookEdit.listPrice

  return (
    <section>
      <h1>{bookId ? 'Edit Book' : 'Add Book'}</h1>
      {!bookId && <GoogleBooks />}

      <form onSubmit={onSaveBook} className="book-form">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={onHandleChange}
          name="title"
        />

        <label htmlFor="amount">Price</label>
        <input
          type="number"
          id="amount"
          value={amount || ''}
          onChange={onHandleChange}
          name="amount"
        />

        <button>Save</button>
      </form>
    </section>
  )
}
