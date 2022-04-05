import React from 'react';
import DATA from '../data'
import { Button } from 'react-bootstrap'

const Select = ({ selectChange, routes, resetFilter, airline, airport }) => {
  let filteredCodes = []
  let filteredIds = []

  const airlineIds = routes.map(route => route.airline)
  
  airlineIds.forEach(id => {
    if (!filteredIds.includes(id)) {
      filteredIds.push(id)
    }
  })

  const airportCodes = routes.map(route => [route.dest, route.src])

  airportCodes.forEach(arr => {
    if (!filteredCodes.includes(arr[0])) {
      filteredCodes.push(arr[0])
    }

    if (!filteredCodes.includes(arr[1])) {
      filteredCodes.push(arr[1])
    }
  })

  const handleReset = (e) => {
    filteredCodes = []
    filteredIds = []
    resetFilter()
  }

  const defaultSelected = airport === 'all' && airline === 'all'

  return (
    <div>
        Show Routes on 
        <select id="airlines" onChange={selectChange}>
          <option value="all" selected={airline === 'all'}>All Airlines</option>
          {DATA.airlines.map(airline => {
            return <option key={airline.id} value={airline.id} disabled={!filteredIds.includes(airline.id)}>
                    {airline.name}
                  </option>
          })}
        </select>

        flying in or out of 

        <select id="airports" onChange={selectChange}>
          <option value='all' selected={airport === 'all'}>All Airports</option>
          {DATA.airports.map(airport => {
            return <option key={airport.code} value={airport.code} 
                      disabled={!filteredCodes.includes(airport.code)}>
                        {airport.name}
                     </option>
          })}
        </select>
        <Button variant="outline-secondary" size="sm" onClick={handleReset} disabled={defaultSelected}>Show All Routes</Button>
    </div>
  )
}

export default Select