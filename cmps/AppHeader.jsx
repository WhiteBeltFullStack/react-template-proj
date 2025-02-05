
export function AppHeader({onSetPage}){

    return (
        <header className="app-header main-layout">
            <section className="app-nav">
                <h1>Books Store</h1>
                <nav >
                    <a onClick={()=>onSetPage('home')}>Home</a>
                    <a onClick={()=>onSetPage('about')}>About</a>
                    <a onClick={()=>onSetPage('books')}>Books</a>
                </nav>
            </section>
        </header>
    )

}