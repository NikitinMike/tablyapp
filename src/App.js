import React from 'react'
import Table from './Table'
import './App.css'
// import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  rows = []

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      rows: []
    };
  }

  render() {
    this.rows = this.state.rows
    return this.state.isLoaded ? (
      <div className='App'>
        <form>
          <Table table={this.rows} cols="7" caption="C O N T A C T S"/>
        </form>
      </div>
    ) : null
  }

  componentDidMount() {
    this.getData(3)
  }

  getData(page) {
    fetch('http://localhost:3000/contacts/page'+page)
      .then(response => response.json())
      .then(data => this.setState({rows: data, isLoaded: true}))
      .catch(e => console.log(e))
  }
}

export default App
