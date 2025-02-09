

export function BookPreview({book}){

    
    return (
        <section className="card-preview">
            <img src={book.thumbnail} alt="" />
            <h3>Title: {book.title}</h3>
            <h3>Price: {book.listPrice.amount}</h3>
            <h3>Page Count: {book.pageCount}</h3>
        </section>
    )
}