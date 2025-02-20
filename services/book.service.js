import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { gBooks } from './books.js'
// console.log('books:',books)

const BOOK_KEY = 'bookDB'
const CACHE_GOOGLE_KEY = 'googleCache'
_createBooks()

export const bookService = {
  query,
  get,
  remove,
  save,
  getEmptyBook,
  getDefaultFilter,
  getBooksFromGoogle,
  addGoogleBook,
  getFilterFromSearchParams,
  getPriceStats,
  getBookDifficultyStats,
}

const gCache = utilService.loadFromStorage(CACHE_GOOGLE_KEY) || {}

// const newBooks = books.map(book => ({
//   ...book,
//   description: utilService.makeLorem()
// }));

function query(filterBy = {}) {
  return storageService.query(BOOK_KEY).then((books) => {
    if (!books || !books.length) {
      books = gBooks
      utilService.saveToStorage(BOOK_KEY, books)
    }

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
  return storageService.get(BOOK_KEY, bookId).then(_setNextPrevBookId)
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

function addGoogleBook(book) {
  return storageService.post(BOOK_KEY, book, false)
}

function getEmptyBook(
  title = '',
  subtitle = '',
  authors = ['Sasha K', 'Alex K'],
  publishedDate = utilService.getRandomDate(),
  description = utilService.makeLorem(20),
  pageCount = utilService.getRandomIntInclusive(20, 800),
  categories = ['Drama', 'Adventure'],
  thumbnail = 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/old-books-cover-design-template-528851dfc1b6ed275212cd110a105122_screen.jpg?ts=1698687093',
  language = 'en',
  listPrice = { amount: 0, currencyCode: 'USD', isOnSale: false }
) {
  return {
    title,
    subtitle,
    authors,
    publishedDate,
    description,
    pageCount,
    categories,
    thumbnail,
    language,
    listPrice,
  }
}

function getDefaultFilter() {
  return { title: '', minPageCount: '', price: '' }
}

function getFilterFromSearchParams(params) {
  // const title = params.get('title') || ''
  // const minPageCount = params.get('minPageCount') || ''
  // const price = params.get('price') || ''

  // return { title, minPageCount, price }
  // OR

  const defaultFilter = getDefaultFilter()
  const filterBy = {}
  for (const field in defaultFilter) {
    filterBy[field] = params.get(field) || defaultFilter[field]
  }

  return filterBy
}

// function _createBooks() {
//   let storedBooks = utilService.loadFromStorage(BOOK_KEY)
//   console.log('storedBooks:', storedBooks)

//   if (!storedBooks || !storedBooks.length || storedBooks.length === 0) {
//     const defaultBooks = [
//       _createBook(
//         'metus hendrerit',
//         'mi est eros convallis auctor arcu dapibus himenaeos',
//         ['Barbara Cartland'],
//         1999,
//         utilService.makeLorem(),
//         713,
//         ['Computers', 'Hack'],
//         'http://coding-academy.org/books-photos/20.jpg',
//         'en',
//         { amount: 109, currencyCode: 'EUR', isOnSale: false }
//       ),
//       _createBook(
//         'morbi',
//         'lorem euismod dictumst inceptos mi',
//         ['Barbara Cartland'],
//         1978,
//         utilService.makeLorem(),
//         129,
//         ['Computers', 'Hack'],
//         'http://coding-academy.org/books-photos/14.jpg',
//         'sp',
//         { amount: 44, currencyCode: 'EUR', isOnSale: true }
//       ),
//       _createBook(
//         'at viverra venenatis',
//         'gravida libero facilisis rhoncus urna etiam',
//         ['Dr. Seuss'],
//         1999,
//         utilService.makeLorem(),
//         972,
//         ['Computers', 'Hack'],
//         'http://coding-academy.org/books-photos/2.jpg',
//         'he',
//         { amount: 108, currencyCode: 'ILS', isOnSale: false }
//       ),
//     ]
//     console.log('Loaded From Hand by books:')
//     utilService.saveToStorage(BOOK_KEY, defaultBooks)
//   }
//   if (storedBooks) {
//     console.log('Loaded From gBooks:')
//     utilService.saveToStorage(BOOK_KEY, storedBooks)
//   }
// }

function _createBooks() {
  let storedBooks = utilService.loadFromStorage(BOOK_KEY)
  if (!storedBooks || !storedBooks.length) {
    const books = gBooks
    console.log('Loaded from gBooks directly:')
    utilService.saveToStorage(BOOK_KEY, books)
  }
}

function _createBook(
  title,
  subtitle,
  authors,
  publishedDate,
  description,
  pageCount,
  categories,
  thumbnail,
  language,
  listPrice
) {
  const book = getEmptyBook(
    title,
    subtitle,
    authors,
    publishedDate,
    description,
    pageCount,
    categories,
    thumbnail,
    language,
    listPrice
  )
  book.id = utilService.makeId()
  return book
}

function _setNextPrevBookId(book) {
  return storageService.query(BOOK_KEY).then((books) => {
    const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
    const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
    const prevBook = books[bookIdx - 1]
      ? books[bookIdx - 1]
      : books[books.length - 1]

    book.nextBook = nextBook.id
    book.prevBook = prevBook.id

    return book
  })
}

function getBooksFromGoogle(bookName) {
  if (bookName === '') return Promise.resolve()
  const googleBooks = gCache[bookName]
  if (googleBooks) {
    console.log('FROM STORAGE:', googleBooks)
    return Promise.resolve(googleBooks)
  }

  const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=effective%20${bookName}`
  return axios.get(url).then((res) => {
    console.log('FROM API:', res.data.items)
    const data = res.data.items
    const formattedBooks = _formatBooks(data)
    gCache[bookName] = formattedBooks
    utilService.saveToStorage(CACHE_GOOGLE_KEY, gCache)
    return formattedBooks
  })
}

function _formatBooks(googleData) {
  return googleData.map((googleBook) => {
    const { volumeInfo } = googleBook
    const book = {
      id: googleBook.id,
      title: volumeInfo.title,
      description: volumeInfo.description || utilService.makeLorem(),
      pageCount: volumeInfo.pageCount,
      authors: volumeInfo.authors,
      categories: volumeInfo.categories,
      publishedDate: volumeInfo.publishedDate,
      language: volumeInfo.language,
      listPrice: {
        amount: utilService.getRandomIntInclusive(100, 500),
        currencyCode: 'USD',
        isOnSale: Math.random() > 0.7,
      },
      reviews: [],
    }
    if (volumeInfo.imageLinks) book.thumbnail = volumeInfo.imageLinks.thumbnail
    return book
  })
}

// STATISTICS

function getPriceStats() {
  
  return storageService.query(BOOK_KEY).then((books) => {
    const booksCountByPriceMap = _getCountByPriceMap(books)
    const data = Object.keys(booksCountByPriceMap).map((priceName) => ({
      title: priceName,
      value: Math.round((booksCountByPriceMap[priceName] / books.length) * 100),
    }))
    return data
  })
}

function _getCountByPriceMap(books) {
  const booksCountByPriceMap = books.reduce(
    (map, book) => {
      const { amount } = book.listPrice

      if (amount < 70) map.cheap++
      else if (amount < 100) map.avarage++
      else map.expensive++
      return map
    },
    { cheap: 0, avarage: 0, expensive: 0 }
  )
  return booksCountByPriceMap
}

function getBookDifficultyStats() {
  return storageService.query(BOOK_KEY).then((books) => {
    const booksCountByDifficultyMap = _getCountByDifficultyMap(books)
    const data = Object.keys(booksCountByDifficultyMap).map(
      (difficultyName) => ({
        title: difficultyName,
        value: Math.round(
          (booksCountByDifficultyMap[difficultyName] / books.length) * 100
        ),
      })
    )
    return data
  })
}

function _getCountByDifficultyMap(books) {
  const booksCountByDifficultyMap = books.reduce(
    (map, book) => {
      if (book.pageCount < 100) map.lightReading++
      else if (book.pageCount < 200) map.mediumReading++
      else map.seriousReading++
      return map
    },
    { lightReading: 0, mediumReading: 0, seriousReading: 0 }
  )
  return booksCountByDifficultyMap
}
