export function ReviewList({ reviews,onRemoveReview }) {

    function starRate(rating){
        var rate = ''
        for(var i = 0 ; i < rating ; i++){
            rate +=''+'⭐' 
        }
        return rate
    }


    return (
        <section className="book-reviews">
          <h3>Reviews</h3>
          <ul>
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <li key={review.id} className="review">
                  <div className="review-header">
                    <strong>{review.fullName}</strong> - {review.date}
                  </div>
                  {review.txt? <div className="review-body">{review.txt}</div> :'No Comment was Added'}
                  <div className="review-rating">{starRate(review.rating)}</div>
                  <button className="delete-review" onClick={()=>onRemoveReview(review.id)}>X</button>
                </li>
              ))
            ) : (
              <p>No reviews yet. Be the first to review this book!</p>
            )}
          </ul>
        </section>
      )
    }

