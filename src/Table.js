import React from 'react'
import Body from './Body'
import './App.css'
import Fields, {Headers} from './Fields'
import {Footers} from './Fields'
import {getPage} from "./DataService";

class Table extends React.Component {

  caption = ''
  cols = 9
  table = []
  page = 1
  order = null
  dir = false

  constructor(props) {
    super(props);
    this.caption = props.caption
    this.cols = props.cols
    this.state = {
      error: null,
      isLoaded: false,
      // table: this.table,
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
      else this.dir = !this.dir
    // console.log(next,order, this.dir)

    const page = this.page
    if (next > 1) this.page = next
    else this.page += (this.table.length > 0) ? next : -1
    if (this.page < 0) this.page = 0
    this.setState({isLoaded: false})

    const table = await getPage(this.page,this.order,this.dir,10)
    // table.map((row, index) => console.log(index,row))
    // console.log(Object.keys(table[0]))
    // console.log(Object.values(table[0]))
    if (table.length > 0) this.table = table; else this.page = page
    // if(this.dir) this.table = this.table.reverse()
    this.setState({isLoaded: true})
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
          {this.getHeader(this.cols)}
          <Body table={this.table} cols={this.cols} getData={this.getData}/>
          {this.getFooter(this.cols)}
        </table>
      </div>
    )
  }

  getColumn(header, index) {
    const column = Fields[index - 1]
    let dir = this.order == column ? (this.dir ? '↑' : '↓') : ''; // ? '▲' : '▼'):''
    // dir = ' '+dir+' '; // <sup>{dir}</sup>
    return (
      <th key={index} id={column}
          bgcolor={column == this.order ? 'teal' : ''}
          onClick={(e) => {
            if (e.target.id) this.getData(0, e.target.id)
            else this.getData(0, 'id')
          }}>
        {dir} {header ? header : index} {dir}
      </th>
    )
  }

  getHeader(cols) {
    return (
      <thead>
      <tr>
        {Headers.slice(0, cols).map((column, index) =>
          this.getColumn(column,index))}
        <th onClick={() => this.getData(-1)}>
          <div>PGUP</div>
        </th>
      </tr>
      </thead>
    )
  }

  getFooter(cols) {
    return (
      <tfoot>
      <tr onClick={() => this.getData(+1)}>
        {Footers.slice(0, cols).map((text, index) =>
          <th key={index}>{text ? text : index}</th>
        )}
        <th>
          <div>PGDN</div>
        </th>
      </tr>
      </tfoot>
    )
  }
}

export default Table
