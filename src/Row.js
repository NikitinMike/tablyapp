import React from 'react'
import Fields from './Fields'
import './App.css'

class Row extends React.Component {

  row = null
  index = 0

  async addRow(data) {
    await fetch('http://localhost:3000/contacts/', {
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(res => {
        console.log(res)
      })
      .catch(e => console.log(e))
    window.location.reload();
  }

  deleteRow(e, row) {
    console.log(row)
    fetch('http://localhost:3000/contacts/' + row, {method: 'DELETE'})
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(e => console.log(e))
    window.location.reload();
  }

  selectCol(e, id) {
    // console.log("ROW",e.target.parentElement)
    this.index = id
    // console.log(this.index)
    // this.index = e.target.parentElement.childNodes[0];
    this.setState({index: this.index})
  }

  data(col, row) {
    return (
      <td key={col + row} onClick={(e) => this.selectCol(e, col, row)}>
        {row[col]}
      </td>
    )
  }

  constructor(props) {
    super(props);
    this.row = props.row
    this.state = {row: this.row, index: this.index};
  }

  render() {
    const row = this.state.row
    const id = row.id;
    return (
      <tr key={this.state.index} onClick={(e) => this.props.select(e, id)}>
        <td onClick={() => this.addRow(row)}>{id}</td>
        {Fields.map(field => this.data(field, row))}
        <td onClick={(e) => this.deleteRow(e, id)}>[X]</td>
      </tr>
    )
  }
}

export default Row