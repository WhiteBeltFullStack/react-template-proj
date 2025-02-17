import { reviewService } from '../services/review.service.js'

const { useState, useEffect, useRef } = React

export function AddReview({onSaveReview}) {
  const [reviewToAdd, setReviewToAdd] = useState(reviewService.getEmptyReview())
  const [charsLeft, setCharsLeft] = useState(200)

  function onSubmitForm(ev) {
    ev.preventDefault()

    // reviewToAdd.date = Date.now(reviewToAdd.date)
    console.log('saved');
    

    onSaveReview(reviewToAdd)
  }

  

  useEffect(() => {
    setCharsLeft(200 - reviewToAdd.txt.length)
  }, [reviewToAdd.txt])

  function onHandleChange({ target }) {
    let { name:field, value, type } = target

    if (type === 'number') value = +value
    setReviewToAdd((prevReviewToAdd) => ({ ...prevReviewToAdd, [field]: value }))
  }

  const { fullName, date, txt, rating } = reviewToAdd

  return (
    <section className="review-modal">
      <form action="" onSubmit={onSubmitForm} className="">
        <div className="review-input-container">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={fullName}
            onChange={onHandleChange}
            id="fullName"
            placeholder='Full Name'
          />

          <label htmlFor="rating">Rating : {rating}</label>
          {/* <input type="range"  className="input-rating" name="rating" value={rating || ''} min={} max={5} onChange={onHandleChange} id="rating"/> */}

          <select
            value={rating}
            onChange={onHandleChange}
            name="rating"
            id="rating"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={onHandleChange}
            id="date"
          />

          <p>chars left : {charsLeft}</p>
          <textarea
            name="txt"
            cols="30"
            rows="10"
            value={txt}
            onChange={onHandleChange}
            maxLength={'200'}
          ></textarea>
          <button>Save</button>
        </div>
      </form>
    </section>
  )
}
