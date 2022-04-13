import React from 'react'
import Fields from './Fields'
import './App.css'

class Row extends React.Component {

  row = null
  index = 0

  selectCol(col,row) {
    // console.log("ROW",e.target.parentElement)
    // this.index = e.target.parentElement.childNodes[0];
  }

  data(col, row) {
    return (
      <td key={col + row} onClick={() => this.selectCol(col, row)}>
        {row[col]}
      </td>
    )
  }

  constructor(props) {
    super(props);
    this.row = props.row
    this.index = props.index
    this.state = {row: this.row, index: this.index};
  }

  render() {
    const row = this.state.row
    const id = row.id;
    return (
      <tr key={this.state.index} onClick={() => this.props.select(id)}>
        <td onClick={() => this.props.addRow({...row})}>{id}</td>
        {Fields.map(field => this.data(field, row))}
        <td onClick={() => this.props.deleteRow(this.index)}>[X]</td>
      </tr>
    )
  }
}

export default Row