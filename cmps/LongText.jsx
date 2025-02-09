const { useState } = React

export function LongText({ desc }) {
  const [showMore, setShowMore] = useState(false)

  function toggleText() {
    setShowMore((prevShowMore) => !prevShowMore)
  }

  const displayText = showMore ? desc : desc.substring(0, 100)

  return (
    <section>
      <strong>
        Description: {displayText} {desc.length > 100 &&  !showMore ? '...' : ''} 
      </strong>
      {desc.length > 100 && (
        <span style={{ cursor: 'pointer' }} onClick={toggleText}>
          {!showMore ? 'Show More' : 'Show Less'}
        </span>
      )}
    </section>
  )
}
