import React from 'react'
import Table from './Table'
import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  rows = []
  page = 1

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      rows: this.rows,
      page: this.page
    };
    this.getData = this.getData.bind(this);
  }

  render() {
    this.rows = this.state.rows
    return this.state.isLoaded && (
      <div className='App'>
        <form>
          <Table table={this.rows} cols="7" caption="C O N T A C T S" getData={this.getData}/>
        </form>
      </div>
    )
  }

  async componentDidMount() {
    await this.getData(0).then(r => console.log(r))
  }

  async getData(next) {
    this.page += (this.rows.length>0)? next:-1
    if (this.page < 0) this.page = 0;
    this.setState({isLoaded: false})
    await fetch('http://localhost:3000/contacts/page' + this.page)
      .then(response => response.json())
      .then(data => this.rows= data)
      .catch(e => console.log(e))
    // console.log(this.rows)
    this.setState({rows: this.rows, isLoaded: true, page: this.page})
    console.log(this.state)
  }
}

export default App
