import React from 'react'
import './App.css'
import Row from './Row'
import RowEdit from './RowEdit'

class Body extends React.Component {

  constructor(props) {
    super(props);
    this.table = props.table
    this.state = {index: null};
  }

  getRow(row, index) {
    // return this.state.index === index
    //   ? <RowEdit key={row.id} row={row} index={index}/>
    return <Row key={index} row={row} index={index} getPage={this.props.getData}/>
  }

  render() {
    return <tbody>{this.table.map((row, i) => this.getRow(row, i))}</tbody>
  }
}

export default Body
