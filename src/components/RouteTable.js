import React, { useState } from 'react';

const RouteTable = ({
  columns = [{ name: "header", property: "value" }],
  rows = [{ id: 1, value: "cell" }],
  format = (_, value) => value,
  perPage = 25,
  className = "table"
}) => {
  const [page, setPage] = useState(0)

  const nextPage = (event) => {
    event.preventDefault()
    setPage(page + 1)
  }

  const previousPage = (event) => {
    event.preventDefault()
    setPage(page - 1)
  }

  const headerCells = columns.map((col) => {
    return <th key={col.name}>{col.name}</th>
  })

  const start = page * perPage

  const bodyRows = rows.slice(start, start + perPage).map((row) => {
    const rows = columns.map((col) => {
      const value = row[col.property]
      return <td key={col.property + value}>{format(col.property, value)}</td>
    })
    return <tr key={Object.values(row).join(":")}>{rows}</tr>
  })
 
  return (
    <div>
      <table className={className}>
        <thead>
          <tr>{headerCells}</tr>
        </thead> 
        <tbody>{bodyRows}</tbody>
      </table>
      <div className="nav">
        <p>Showing {start + 1}-{start + bodyRows.length} of {rows.length} routes</p>
        <p>
          <button 
            variant="outline-secondary" 
            disabled={page === 0} 
            size="sm" 
            onClick={previousPage}>
            Previous Page
          </button>
          <button 
            variant="outline-secondary" 
            disabled={start + perPage >= rows.length} 
            size="sm" 
            onClick={nextPage}>
            Next Page
          </button>
        </p>
      </div>
    </div>
  )
}

export default RouteTable