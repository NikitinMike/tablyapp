import React from 'react'
import './App.css'
import {addRow, deleteRow} from "./DataService";

class Row extends React.Component {

  constructor(props) {
    super(props);
    this.index = props.index
    this.row = props.row
    this.fields = Object.keys(props.row).slice(1)
  }

  addRow(row) {
    addRow(row).then(() => this.props.getPage(0))
  }

  async deleteRow(index) {
    deleteRow(this.row.id).then(() => this.props.getPage(0))
  }

  data(col, row) {
    return <td key={col + row.id}>{row[col]}</td>
  }

  render() {
    const row = this.row
    // return <tr key={this.index} onClick={() => this.props.select(row.id)}>
    return <tr key={this.index} onClick={() => this.props.select(this.index)}>
      <td onClick={() => this.addRow({...row})}>
        <div>{this.index}:{row.id}</div>
      </td>
      {this.fields.map(field => this.data(field, row))}
      <td onClick={() => this.deleteRow(this.index)}>
        <button>[XXX]</button>
      </td>
    </tr>
  }
}

export default Row