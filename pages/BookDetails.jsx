import { bookService } from '../services/book.service.js'
import { BookCount } from '../cmps/BookCount.jsx'
import { PublishedDate } from '../cmps/PublishedDate.jsx'
import { LongText } from '../cmps/LongText.jsx'
import { AddReview } from '../cmps/AddReview.jsx'
import { reviewService } from '../services/review.service.js'
import { ReviewList } from '../cmps/ReviewList.jsx'

import { showErrorMsg } from '../services/event-bus.service.js'
import { showSuccessMsg } from '../services/event-bus.service.js'

const { useParams, useNavigate, Link } = ReactRouterDOM

const { useState, useEffect } = React

export function BookDetails() {
  const [book, setBook] = useState(null)
  const [isCheap, setIsCheap] = useState(false)

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (book) {
      if (book.listPrice.amount < 20) {
        setIsCheap(true)
      } else if (book.listPrice.amount > 150) {
        setIsCheap(false)
      } else {
        setIsCheap(null)
      }
    }
  }, [book])

  useEffect(() => {
    loadBook()
  }, [params.bookId])

  function loadBook() {
    bookService
      .get(params.bookId)
      .then(setBook)
      .catch((err) => {
        showErrorMsg('Couldnt get book...')
        navigate(`/book`)
      })
  }

  function onSaveReview(review) {
    reviewService.saveReview(book.id, review).then((review) => {
      setBook((prevBook) => {
        const reviews = prevBook.reviews
          ? [review, ...prevBook.reviews]
          : [review]
        return { ...prevBook, reviews }
      })
    })
    .catch(() => showErrorMsg(`Review to ${book.title} Failed!`))
  }

  function onRemoveReview(reviewId) {
    reviewService.removeReview(book.id, reviewId).then(() => {
      setBook((prevBook) => {
        const filteredReviews = prevBook.reviews.filter(
          (review) => review.id !== reviewId
        )
        return { ...prevBook, reviews: filteredReviews }
      })
    })
  }

  if (!book) return 'Loading Book ...'
  return (
    <section>
      <div className="book-details">
        {book.listPrice.isOnSale && (
          <div className="on-sale">On - Sale !!!</div>
        )}
        <div>
          <img src={book.thumbnail} alt={book.title} />
          <button>
            <Link to="/book">Close</Link>
          </button>
          <button>
            <Link to={`/book/${book.nextBook}`}>Next Book</Link>
          </button>
          <button>
            <Link to={`/book/${book.prevBook}`}>Prev Book</Link>
          </button>
        </div>
        <div>
          <h2>{book.title}</h2>
          <div>
            <strong>Authors:</strong> {(book.authors || []).join(', ')}
          </div>
          <div>
            <PublishedDate publishedDate={book.publishedDate} />
          </div>
          <div>
            <BookCount pageCount={book.pageCount} />
          </div>
          <div>
            <strong>Categories:</strong> {(book.categories) || [].join(', ')}
          </div>
          <div>
            <LongText desc={book.description} />
          </div>
          <div>
            <strong>Price:</strong>
            <div
              className={
                isCheap === true ? 'green' : isCheap === false ? 'red' : ''
              }
            >
              {book.listPrice.amount} {book.listPrice.currencyCode}
            </div>
          </div>
        </div>
      </div>

      <AddReview onSaveReview={onSaveReview} />

      <ReviewList onRemoveReview={onRemoveReview} reviews={book.reviews} />
    </section>
  )
}
