

export function GoogleBookList({books,onSave}){


    return (
        <section className="google-book-list">
        <ul>
            {books.map(book => (
                <li key={book.id}>
                    <span>{book.title}</span>
                    <button onClick={() => onSave(book)}>+</button>
                </li>
            ))}
        </ul>
    </section>
    
    )

    

}