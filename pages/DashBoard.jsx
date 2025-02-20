const { useEffect, useState } = React

import { bookService } from '../services/book.service.js'
import { Charts } from '../cmps/Charts.jsx'

export function DashBoard() {
  const [books, setBooks] = useState([])
  const [priceStats, setPriceStats] = useState([])
  const [difficultyStats, setDifficultyStats] = useState([])

  useEffect(() => {
    bookService.query().then(setBooks)

    bookService.getPriceStats().then(setPriceStats)

    bookService.getBookDifficultyStats().then(setDifficultyStats)
  },[])

  return (
    <section className="chart-section">
      <h1>Dash-Board-Statistics</h1>
      <h2>Stats for {books.length} Books</h2>
      <h4>By Price:</h4>
      <Charts data={priceStats} />

      <hr />
      <h4>By Reading Difficulty:</h4>
      <Charts data={difficultyStats} />
    </section>
  )
}
