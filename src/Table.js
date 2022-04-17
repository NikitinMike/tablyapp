import React from 'react'
import Body from './Body'
import './App.css'
import Fields, {Headers, Site} from './Fields'
import {Footers} from './Fields'

class Table extends React.Component {

  caption = ''
  cols = 9
  table = []
  page = 1
  order = null
  direction = false

  constructor(props) {
    super(props);
    this.caption = props.caption
    this.cols = props.cols
    this.state = {
      error: null,
      isLoaded: false,
      table: [],
    };
    this.getData = this.getData.bind(this);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPressed.bind(this));
  }

  async componentDidMount() {
    document.addEventListener("keydown", this.onKeyPressed.bind(this));
    await this.getData(0).then(r => console.log(r))
  }

  async getData(next, order) {
    if (order != null)
      if (order !== this.order) this.order = order
      else this.direction = !this.direction
    // console.log(next,order, this.direction)

    const page = this.page
    if (next > 1) this.page = next
    else this.page += (this.state.table.length > 0) ? next : -1
    if (this.page < 0) this.page = 0
    this.setState({isLoaded: false})

    const response = await fetch(Site + (this.order ? '/' + this.order : '') + '/page'
      + this.page + ((order == null) ? '' : ('?dir=' + (this.direction ? '1' : '-1'))))
    const table = await response.json();
    if (table.length > 0) this.table = table; else this.page = page
    // if(this.direction) this.table = this.table.reverse()
    this.setState({table: this.table, isLoaded: true})
  }

  onKeyPressed(e) {
    // console.log(e.keyCode);
    if (e.keyCode === 33) this.getData(-1).then(r => console.log(r));
    if (e.keyCode === 34) this.getData(+1).then(r => console.log(r));
  }

  render() {
    return this.state.isLoaded && (
      <div onKeyDown={this.onKeyPressed}>
        <table rules='all' frame='border'>
          <caption>{this.caption + ' - ' + (1 + this.page)}</caption>
          {this.header(this.cols)}
          <Body table={this.state.table} cols={this.cols} getPage={this.getData}/>
          {this.footer(this.cols)}
        </table>
      </div>
    )
  }

  header(cols) {
    return (
      <thead>
      {/*<tr onClick={() => this.getData(-1)}>*/}
        <tr>
        {Headers.slice(0, cols).map((header, index) =>
          <th key={index} id={Fields[index - 1]}
              onClick={(e) => {
                if (e.target.id) this.getData(0, e.target.id).then(r => console.log(r))
              }}>
            {header ? header : index}
          </th>)}
        <th>
          <button>PGUP</button>
        </th>
      </tr>
      </thead>
    )
  }

  footer(cols) {
    return (
      <tfoot>
      <tr onClick={() => this.getData(+1)}>
        {Footers.slice(0, cols).map((text, index) =>
          <th key={index}>{text ? text : index}</th>
        )}
        <th>
          <button>PGDN</button>
        </th>
      </tr>
      </tfoot>
    )
  }
}

export default Table
