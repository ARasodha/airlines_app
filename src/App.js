import React, { useState } from 'react';
import './App.css';
import RouteTable from './components/RouteTable'
import Select from './components/Select'
import DATA from './data'

const columns = [
  {name: 'Airline', property: 'airline'},
  {name: 'Source Airport', property: 'src'},
  {name: 'Destination Airport', property: 'dest'},
];

function formatValue(property, value) { 
  if (property === "airline") {
    return DATA.getAirlineById(value).name
  } else {
    return DATA.getAirportByCode(value).name
  }
}

const App = () => {
  const [routes, setRoutes] = useState(DATA.routes)
  const [airline, setAirline] = useState('all')
  const [airport, setAirport] = useState('all')
  console.log(airport)
  console.log(airline)
  const selectChange = (e) => {
    const airlineId = document.getElementById('airlines').value
    const airportCode = document.getElementById('airports').value
    setAirline(airlineId)
    setAirport(airportCode)

    if (airline === 'all' && airport === 'all') {
      setRoutes(DATA.routes)
    } else if (airline === 'all') {
      setRoutes(DATA.routes.filter(route => route.dest === airport || route.src === airport))
    } else if (airport === 'all') {
      setRoutes(DATA.routes.filter(route => route.airline === Number(airline)))
    } else {
      setRoutes(DATA.routes.filter(route => route.airline === Number(airline) 
                && (route.dest === airport || route.src === airport)))
    }
  }

  const resetFilter = () => {
    setRoutes(DATA.routes)
    setAirline('all')
    setAirport('all')
  }



  return (
    <div className="app">
    <header className="header">
      <h1 className="title">Airline Routes</h1>
    </header>
    <section>
      <Select selectChange={selectChange} routes={routes} resetFilter={resetFilter} airline={airline} airport={airport} />
    </section>
    <RouteTable className="routes-table" routes={routes} columns={columns} rows="" format={formatValue} />
  </div>
  )
}
export default App;