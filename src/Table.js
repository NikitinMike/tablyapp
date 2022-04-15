import React from 'react'
import Body from './Body'
import './App.css'
import Fields, {Headers} from './Fields'
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

  onKeyPressed(e) {
    // console.log(e.keyCode);
    if (e.keyCode===33) this.getData(-1);
    if (e.keyCode===34) this.getData(+1);
  }

  render() {
    this.table = this.state.table
    return this.state.isLoaded && (
      <div onKeyDown={this.onKeyPressed}>
        <table rules='all' frame='border'>
          <caption>{this.caption +' - '+ this.state.page}</caption>
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
      <tr onClick={() => this.getData(-1)}>
        {/*<tr>*/}
        {Headers.slice(0, cols).map((header, index) =>
          <th key={index} id={Fields[index - 1]}
              onClick={(e) => {
                if (e.target.id) this.getData(0, e.target.id).then(r => console.log(r))
              }}>
              {header ? header : index}
          </th>)}
          <th><button>PGUP</button></th>
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
        <th><button>PGDN</button></th>
      </tr>
      </tfoot>
    )
  }
}

export default Table
