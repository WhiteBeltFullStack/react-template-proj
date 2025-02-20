import { reviewService } from '../services/review.service.js'

// import { StarRating } from '../cmps/StarRating.jsx'
// import { SelectRating } from '../cmps/SelectRating.jsx'
// import { NumberInputRating } from '../cmps/NumberInputRating.jsx'
import { DynamicCmp } from '../cmps/DynamicCmp.jsx'

const { useState, useEffect, useRef } = React

export function AddReview({onSaveReview}) {
  const [reviewToAdd, setReviewToAdd] = useState(reviewService.getEmptyReview())
  const [charsLeft, setCharsLeft] = useState(200)

  const [cmpType, setCmpType] = useState('stars')

  function onSubmitForm(ev) {
    ev.preventDefault()

    // reviewToAdd.date = Date.now(reviewToAdd.date)
    console.log('saved');
    

    onSaveReview(reviewToAdd)
  }

  function onChangeCmpType({ target }) {
    const selectedType = target.value
    setCmpType(selectedType)
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

          {/* <label htmlFor="rating">Rating : {rating}</label>

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
          </select> */}



<div className='rate-by-choice'>
                    <p className='bold-txt'>Select rating type:</p>
                    <label htmlFor="select">Select</label>
                    <input name='rating' onChange={onChangeCmpType} id='select' type="radio" value='select' />

                    <label htmlFor="numInput">Number Input</label>
                    <input name='rating' onChange={onChangeCmpType} id='numInput' type="radio" value='numInput' />

                    <label htmlFor="stars">Stars</label>
                    <input name='rating' onChange={onChangeCmpType} id='stars' type="radio" value='stars' />
                </div>

                <DynamicCmp  cmpType={cmpType} handleChange={onHandleChange} rating={rating} />

                {/* {cmpType === 'select' && <SelectRating handleChange={onHandleChange} rating={rating} />}
                {cmpType === 'numInput' && <NumberInputRating handleChange={onHandleChange} rating={rating} />}
                {cmpType === 'stars' && <StarRating handleChange={onHandleChange} rating={rating} />} */}



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
