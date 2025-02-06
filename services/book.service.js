import { utilService} from './util.service.js'
import { storageService } from './async-storage.service.js'
import {books} from './books.js'
// console.log('books:',books)

const BOOK_KEY = 'bookDB'
_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getDefaultFilter,
}

// const newBooks = books.map(book => ({
//   ...book,
//   description: utilService.makeLorem() 
// }));

function query(filterBy = {}) {
  return storageService.query(BOOK_KEY).then((books) => {
    if (filterBy.title) {
      const regExp = new RegExp(filterBy.title, 'i')
      books = books.filter((book) => regExp.test(book.title))
    }
    if (filterBy.minPageCount) {
      books = books.filter((book) => book.pageCount >= filterBy.minPageCount)
    }

    if (filterBy.price) {
      books = books.filter((book) => book.listPrice.amount <= filterBy.price)
    }
    return books
  })
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book)
  } else {
    return storageService.post(BOOK_KEY, book)
  }
}

function getEmptyBook(title = '', subtitle = '', authors = [], publishedDate = '', description = '', pageCount = 0, categories = [], thumbnail = '', language = 'en', listPrice = { amount: 0, currencyCode: 'USD', isOnSale: false }) {
    return { title, subtitle, authors, publishedDate, description, pageCount, categories, thumbnail, language, listPrice }
}


function getDefaultFilter() {
    return { title: '', minPageCount: '' ,price:''}
}

function _createBooks(){
    let storedBooks = utilService.loadFromStorage(BOOK_KEY)
    console.log('storedBooks:',storedBooks)
    if(!storedBooks || !storedBooks.length || storedBooks.length === 0 ){
     const defaultBooks = [
            _createBook('metus hendrerit', 'mi est eros convallis auctor arcu dapibus himenaeos', ['Barbara Cartland'], 1999, utilService.makeLorem(), 713, ['Computers', 'Hack'], 'http://coding-academy.org/books-photos/20.jpg', 'en', { amount: 109, currencyCode: 'EUR', isOnSale: false }),
            _createBook('morbi', 'lorem euismod dictumst inceptos mi', ['Barbara Cartland'], 1978,  utilService.makeLorem(), 129, ['Computers', 'Hack'], 'http://coding-academy.org/books-photos/14.jpg', 'sp', { amount: 44, currencyCode: 'EUR', isOnSale: true }),
            _createBook('at viverra venenatis', 'gravida libero facilisis rhoncus urna etiam', ['Dr. Seuss'], 1999, utilService.makeLorem(), 972, ['Computers', 'Hack'], 'http://coding-academy.org/books-photos/2.jpg', 'he', { amount: 108, currencyCode: 'ILS', isOnSale: false })
        ]
        utilService.saveToStorage(BOOK_KEY,defaultBooks)
        
      }
      console.log('storedBooks:',storedBooks)
      utilService.saveToStorage(BOOK_KEY,storedBooks)
    }


function _createBook(title, subtitle, authors, publishedDate, description, pageCount, categories, thumbnail, language, listPrice) {
    const book = getEmptyBook(title, subtitle, authors, publishedDate, description, pageCount, categories, thumbnail, language, listPrice)
    book.id = utilService.makeId()
    return book
}