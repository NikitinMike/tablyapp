import React from 'react'
import Fields, {Site} from './Fields'
import './App.css'

class Row extends React.Component {

  row = null
  index = 0

  // selectCol(col, row) {
  //   // console.log("ROW",e.target.parentElement)
  //   // this.index = e.target.parentElement.childNodes[0];
  // }

  data(col, row) {
    return (<td key={col + row.id}>{row[col]}</td>)
  }

  constructor(props) {
    super(props);
    this.row = props.row
    this.index = props.index
    this.state = {row: this.row, index: this.index};
  }

  addRow(row) {
    fetch(Site+'/', {
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(row)
    })
      .then(response => response.json())
      .then(res => {this.props.getPage(0)})
      .catch(e => console.log(e))
  }

  async deleteRow(index) {
    // const row = this.rows[index]
    await fetch(Site+'/' + this.row.id, {method: 'DELETE'})
      .then(response => response.json())
      .then(data => {this.props.getPage(0)})
      .catch(e => console.log(e))
  }

  render() {
    const row = this.state.row
    const id = row.id;
    return (
      <tr key={this.state.index} onClick={() => this.props.select(id)}>
        <td onClick={() => this.addRow({...row})}>
          <button>{id}</button>
        </td>
        {Fields.map(field => this.data(field, row))}
        <td onClick={() => this.deleteRow(this.index)}>
          <button>[XXX]</button>
        </td>
      </tr>
    )
  }
}

export default Row