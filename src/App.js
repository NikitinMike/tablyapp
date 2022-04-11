import React from 'react'
import Table from './Table'
import './App.css'
// import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  rows = []
  page = 1

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      rows: [],
      page: this.page
    };
    this.getData = this.getData.bind(this);
  }

  render() {
    this.rows = this.state.rows
    return this.state.isLoaded ? (
      <div className='App'>
        <form>
          <Table table={this.rows} cols="7" caption="C O N T A C T S" getData={this.getData}/>
        </form>
      </div>
    ) : null
  }

  componentDidMount() {
    this.getData(this.page).then(r => console.log(r))
  }

  async getData(page) {
    console.log(page)
    this.page = page
    this.setState({page: this.page,isLoaded: false})
    await fetch('http://localhost:3000/contacts/page' + this.state.page)
      .then(response => response.json())
      .then(data => this.setState({rows: data, isLoaded: true}))
      .catch(e => console.log(e))
    console.log(this.state)
  }
}

export default App
