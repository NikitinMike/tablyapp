import React from 'react'
import Table from './Table'
import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  table = []
  page = 1
  order = null
  direction = false

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      table: this.table,
      page: this.page,
      order: this.order,
      dir: this.direction
    };
    this.getData = this.getData.bind(this);
  }

  render() {
    this.table = this.state.table
    return this.state.isLoaded && (
      <div className='App'>
        <form>
          <Table table={this.table} cols="7" caption="C O N T A C T S" getData={this.getData}/>
        </form>
      </div>
    )
  }

  async componentDidMount() {
    await this.getData(0).then(r => console.log(r))
  }

  async getData(next, order) {
    if (order != null)
      if (order !== this.order) this.order = order
      else this.direction = !this.direction
    const dir = (order == null) ? '' : ('?dir=' + (this.direction ? '1' : '-1'))
    // console.log(order, this.direction, dir)
    if (next > 1) this.page = next
    else this.page += (this.table.length > 0) ? next : -1
    if (this.page < 0) this.page = 0;
    this.setState({isLoaded: false})
    // if(this.direction) this.table = this.table.reverse()
    await fetch((this.order ? 'http://localhost:3000/contacts/' + this.order
      : 'http://localhost:3000/contacts') + '/page' + this.page + dir)
      .then(response => response.json())
      .then(data => this.table = data)
      .catch(e => console.log(e))
    this.setState({table: this.table, isLoaded: true, page: this.page, order: this.order})
  }
}

export default App
