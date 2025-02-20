
const {Link,Outlet} = ReactRouterDOM

export function About() {
  return (
    <section>
      <div className="about">
        <h2>Welcome to Book Haven</h2>
        <p>
          At Book Haven, we believe in the power of stories. Whether you're
          looking for the latest bestseller, a timeless classic, or a hidden
          gem, we’ve got something for every kind of reader. Our goal is to
          offer a wide range of books that cater to all tastes, ages, and
          interests.
        </p>
        <p>
          Explore our collection of novels, non-fiction, children's books, and
          more. Our staff is passionate about books and always ready to help you
          discover your next great read. If you can’t find the book you're
          looking for, don’t hesitate to ask – we can order it for you!
        </p>
        <div className="about-quote">
          <p>
            <em>
              "A room without books is like a body without a soul." – Marcus
              Tullius Cicero
            </em>
          </p>
        </div>
        <p>
          Whether you're shopping for yourself or searching for the perfect
          gift, Book Haven is here to make your reading journey as enjoyable as
          possible. Join our community of book lovers and discover the magic
          within each page.
        </p>
      </div>
      <nav className="about-nav">
        <Link replace to ="/about/knowledge">Knowledge</Link>
        <Link replace to ="/about/benefits">Benefits</Link>
      </nav>

      <Outlet/>
    </section>
  )
}
