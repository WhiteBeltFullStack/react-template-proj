const {Link,NavLink} = ReactRouterDOM

export function AppHeader() {



  return (
    <header className="app-header main-layout">
      <section className="app-nav">
        <h1>Books Store</h1>
        <nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/book">Books</NavLink>
        </nav>
      </section>
    </header>
  )
}
