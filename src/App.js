import React from 'react'
import Page from './Page'
import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render() {
    return <div className='App'>
      <Page cols="7" rows="10" caption=" C O N T A C T S "/>
    </div>
  }
}

export default App
