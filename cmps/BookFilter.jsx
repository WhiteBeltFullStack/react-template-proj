const { useState, useEffect } = React

export function BookFilter({ onSetFilterBy, filterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

  function onHandleChange(ev) {
    let { type, name, value } = ev.target

    if (type === 'number') value = +value
    setFilterByToEdit((prevFilterBy) => ({ ...prevFilterBy, [name]: value }))
  }

  function onSubmitForm(ev) {
    ev.preventDefault()
    onSetFilterBy(filterByToEdit)
  }

  return (
    <section className="filter-section">
      <h2>Search the books you need</h2>
      <form action="" onSubmit={onSubmitForm}>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={onHandleChange}
          value={filterBy.title}
          placeholder="Title"
        />

        <label htmlFor="price">Max Price: </label>
        <input
          type="number"
          id="price"
          name="price"
          onChange={onHandleChange}
          value={filterBy.price || ''}
          placeholder="Min Price"
        />

        <label htmlFor="min-page-count">Minimum Pages:</label>
        <input
          type="number"
          id="min-page-count"
          name="minPageCount"
          onChange={onHandleChange}
          value={filterBy.minPageCount || ''}
        />
      </form>
    </section>
  )
}

