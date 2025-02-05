

export function CarPreview({book}){

    
    return (
        <section className="card-preview">
            <h3>Title: {book.title}</h3>
            <h3>Price: {book.listPrice.amount}</h3>
            <h3>Page Count: {book.pageCount}</h3>
        </section>
    )
}