import { utilService} from './util.service.js'
import { storageService } from './async-storage.service.js'
import {books} from './books.js'

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
    if(!storedBooks || !storedBooks.length){
     const defaultBooks = [
            _createBook('metus hendrerit', 'mi est eros convallis auctor arcu dapibus himenaeos', ['Barbara Cartland'], 1999, 'placerat nisi sodales suscipit tellus tincidunt mauris elit sit luctus interdum ad dictum platea vehicula conubia fermentum habitasse congue suspendisse', 713, ['Computers', 'Hack'], 'http://coding-academy.org/books-photos/20.jpg', 'en', { amount: 109, currencyCode: 'EUR', isOnSale: false }),
            _createBook('morbi', 'lorem euismod dictumst inceptos mi', ['Barbara Cartland'], 1978, 'aliquam pretium lorem laoreet etiam odio cubilia iaculis placerat aliquam tempor nisl auctor', 129, ['Computers', 'Hack'], 'http://coding-academy.org/books-photos/14.jpg', 'sp', { amount: 44, currencyCode: 'EUR', isOnSale: true }),
            _createBook('at viverra venenatis', 'gravida libero facilisis rhoncus urna etiam', ['Dr. Seuss'], 1999, 'lorem molestie ut euismod ad quis mi ultricies nisl cursus suspendisse dui tempor sit suscipit metus etiam euismod tortor sagittis habitant', 972, ['Computers', 'Hack'], 'http://coding-academy.org/books-photos/2.jpg', 'he', { amount: 108, currencyCode: 'ILS', isOnSale: false })
        ]
        utilService.saveToStorage(BOOK_KEY,books)
        return defaultBooks
    }
    return storedBooks
}


function _createBook(title, subtitle, authors, publishedDate, description, pageCount, categories, thumbnail, language, listPrice) {
    const book = getEmptyBook(title, subtitle, authors, publishedDate, description, pageCount, categories, thumbnail, language, listPrice)
    book.id = utilService.makeId()
    return book
}