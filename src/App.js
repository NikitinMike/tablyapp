import React from 'react'
import Table from './Table'
import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Table cols="7" caption=" C O N T A C T S "/>
      </div>
    )
  }
}

export default App
