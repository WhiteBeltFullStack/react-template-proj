export function NumberInputRating({ handleChange, rating }) {

    return (
        <input
            name='rating'
            value={rating}
            onChange={handleChange}
            type="number"
        />
    )
}