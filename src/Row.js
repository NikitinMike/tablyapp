import React from 'react'
import Fields, {Site} from './Fields'
import './App.css'
import {addRow, deleteRow} from "./DataService";

class Row extends React.Component {

  data(col, row) {
    return (<td key={col + row.id}>{row[col]}</td>)
  }

  constructor(props) {
    super(props);
    this.state = {row: this.props.row, index: this.props.index};
  }

  addRow(row) {
    addRow(row).then(r => this.props.getPage(0))
  }

  async deleteRow(index) {
    deleteRow(this.state.row.id).then(r => this.props.getPage(0))
  }

  render() {
    const row = this.state.row
    const id = row.id;
    return (
      <tr key={this.state.index} onClick={() => this.props.select(id)}>
        <td onClick={() => this.addRow({...row})}>
          <div>{id}</div>
        </td>
        {Fields.map(field => this.data(field, row))}
        <td onClick={() => this.deleteRow(this.state.index)}>
          <button>[XXX]</button>
        </td>
      </tr>
    )
  }
}

export default Row