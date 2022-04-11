import React from 'react'
import Body from './Body'
import './App.css'
import {Headers} from './Fields'
import {Footers} from './Fields'

const Header = ({headers, cols}) =>
  <thead>
  <tr onClick={(e) => pageUp({e})}>
    {headers.slice(0, cols).map((header, index) =>
      <th key={index}>{header ? header : index}</th>)}
  </tr>
  </thead>

function pageUp(param) {console.log("UP",param)}
function pageDown(param) {console.log("DOWN",param)}

const Footer = ({cols, footers}) =>
  <tfoot>
  <tr onClick={(e) => pageDown({e})}>
    {footers.slice(0, cols).map((text, index) =>
      <td key={index}>{text ? text : index}</td>)}
  </tr>
  </tfoot>

class Table extends React.Component {

  caption = ''
  cols = 9
  table = []

  constructor(props) {
    super(props);
    this.table = props.table
    this.caption = props.caption
    this.state = {table: this.table};
  }

  render() {
    return (
      <div>
        <table rules='all' frame='border'>
          <caption>{this.caption}</caption>
          <Header headers={Headers} cols={this.cols} />
          <Body rows={this.state.table} cols={this.cols} index={this.index}/>
          <Footer cols={this.cols} footers={Footers}/>
        </table>
      </div>
    )
  }
}

export default Table
