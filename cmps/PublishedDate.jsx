export function PublishedDate({publishedDate}) {
  function bookDateRelease(publishedDate) {
    const currentYear = new Date().getFullYear()
    if (currentYear - publishedDate > 10) return 'Vintage'
    return 'New'
  }

  return (
    <strong>
      Published:{publishedDate} - {bookDateRelease(publishedDate)}{' '}
    </strong>
  )
}
