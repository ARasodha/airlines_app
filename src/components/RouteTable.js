import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap'

const RouteTable = ({ format, perPage = 25, routes }) => {
  const [rowCount, setRowCount] = useState(0)
  const rowsToShow = routes.slice(rowCount, rowCount + 26)

  const handlePrevBtn = (e) => {
    if (rowCount - perPage < 0) return
    setRowCount(rowCount - perPage)
  }

  const handleNextBtn = (e) => {
    if (rowCount + perPage >= 850) return
    setRowCount(rowCount + perPage)
  }

  return (
    <>
      <Table striped>
        <thead>
          <tr>
            <th>Airline</th>
            <th>Source Airport</th>
            <th>Destination Airport</th>
          </tr>
        </thead> 
        <tbody>
          {rowsToShow.map((route, idx) => {
            const airline = format('airline', route.airline)
            const sourceAirport = format('airport', route.src)
            const destinationAirport = format('airport', route.dest)
            return (
              <tr key={idx}>
                <td>
                  {airline}
                </td>
                <td>
                  {sourceAirport}
                </td>
                <td>
                  {destinationAirport}
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
      <footer>
        <Button variant="outline-secondary" disabled={rowCount - perPage < 0} size="sm" onClick={handlePrevBtn}>Previous</Button>
        <p>Showing {rowCount + 1} - {rowCount + perPage} routes of {routes.length} routes</p>
        <Button variant="outline-secondary" disabled={rowCount + perPage >= routes.length} size="sm" onClick={handleNextBtn}>Next</Button>
      </footer>
    </>
  )
}

export default RouteTable