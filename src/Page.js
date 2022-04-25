import React from 'react'
import './App.css'
import {DataService} from "./DataService";
import Row from "./Row";

class Page extends React.Component {

  table = []
  page = 0
  order = null
  dir = false

  constructor(props) {
    super(props);
    this.caption = props.caption || ''
    this.cols = props.cols || 0
    this.rows = props.rows || 0
    this.state = {
      error: null,
      isLoaded: false,
    };
    this.getData = this.getData.bind(this);
  }

  async getData(next, order) {
    if (order != null)
      if (order !== this.order) this.order = order
      else this.dir = !this.dir

    const page = this.page
    if (next > 1) this.page = next
    else this.page += (this.table.length > 0) ? next : -1
    if (this.page < 0) this.page = 0
    this.setState({isLoaded: false})

    const table = await DataService.getPage(this.page, this.order, this.dir, this.rows)
    // table.map((row, index) => console.log(index,row))
    // console.log(Object.keys(table[0]))
    // console.log(Object.values(table[0]))
    if (table.length > 0) this.table = table; else this.page = page
    // if(this.dir) this.table = this.table.reverse()
    this.setState({isLoaded: true})
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyPressed.bind(this));
  }

  async componentDidMount() {
    document.addEventListener("keydown", this.onKeyPressed.bind(this));
    await this.getData(0).then(r => console.log(r))
    this.fields = Object.keys(this.table[0])
  }

  onKeyPressed(e) {
    if (e.keyCode === 27) this.getData(0).then(r => console.log(r));
    if (e.keyCode === 33) this.getData(-1).then(r => console.log(r));
    if (e.keyCode === 34) this.getData(+1).then(r => console.log(r));
  }

  getRow(row, index) {
    return <Row key={index} row={row} index={index} getPage={this.getData}/>
  }

  getBody(table) {
    return <tbody>{table.map((row, i) => this.getRow(row, i))}</tbody>
  }

  getColumn(header, index) {
    const column = DataService.Fields[index - 1]
    const dir = column == this.order ? (this.dir ? '↑' : '↓') : ''; // ? '▲' : '▼'):''
    // dir = ' '+dir+' '; // <sup>{dir}</sup>
    return <th key={index} id={column} bgcolor={dir ? 'teal' : ''}
               onClick={(e) => this.getData(0, e.target.id)}>
      {dir} {header ? header : index} {dir}
    </th>
  }

  getHeader(headers) {
    return <thead>
    <tr>
      {headers.map((col, i) => this.getColumn(col, i))}
      <th onClick={() => this.getData(-1)}>
        <div>PGUP</div>
      </th>
    </tr>
    </thead>
  }

  getFooter(footers) {
    return <tfoot>
    <tr onClick={() => this.getData(+1)}>
      {footers.map((f, i) => <th key={i}>{f ? f : i}</th>)}
      <th>
        <div>PGDN</div>
      </th>
    </tr>
    </tfoot>
  }

  render() {
    return this.state.isLoaded && <div onKeyDown={this.onKeyPressed}>
      <table rules='all' frame='border'>
        <caption>{this.caption + ' - ' + (1 + this.page)}</caption>
        {this.getHeader(DataService.Headers.slice(0, this.cols))}
        {this.getBody(this.table)}
        {this.getFooter(DataService.Footers.slice(0, this.cols))}
      </table>
    </div>
  }
}

export default Page
