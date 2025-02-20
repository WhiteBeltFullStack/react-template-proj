export function StarRating({ rating, handleChange }) {

    function onSetRating(rate) {
        const target = { name: 'rating', value: rate };
        handleChange({ target });
    }

    return (
        <div className={`star-rating`} >
            {[...Array(5)].map((_, idx) => (
                <span
                    key={idx}
                    className={`star ${idx < rating ? 'on' : 'off'}`}
                    onClick={() => onSetRating(idx + 1)}
                >
                    &#9733;
                </span>
            ))}
        </div>)
}