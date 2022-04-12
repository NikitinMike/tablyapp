import React from 'react'
import Fields from './Fields'
import './App.css'

class EditRow extends React.Component {

  row = null
  index = 0

  editData(e, row, col) {
    const td = e.target // .lastChild
    // e.target.style.background = e.target.style.background ? '' : 'RED'
    if (td.value === row[col]) return
    row[col] = td.value
    this.setState({row: row, edit: true})
  }

  input(col, row) {
    row = this.state.row
    return (
      <td key={col+row.id}>
        <input value={row[col]} color={'RED'} size={12}
               onChange={(e) => this.editData(e, row, col)}/>
      </td>
    )
  }

  async getRow(id) {
    await fetch('http://localhost:3000/contacts/' + id, {method: 'GET'})
      .then(response => response.json())
      .then(async data => {
        console.log(data)
      })
      .catch(e => console.log(e))
  }

  putRow(id) {
    const row = this.state.row // s[this.state.index]
    if (this.state.edit)
      fetch('http://localhost:3000/contacts/' + row.id, {
        body: JSON.stringify(row),
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
        // .then(data => console.log(data))
        .catch(e => console.log(e))
  }

  componentWillUnmount() {
    this.putRow(this.state.row.id)
  }

  constructor(props) {
    super(props);
    this.row = this.props.row
    this.index = this.row.id
    this.state = {row: this.row, index: this.index, edit: false};
  }

  render() {
    const row = this.state.row
    return (
      <tr key={"edit"}>
        <td>{this.state.index}</td>
        {Fields.map(field => this.input(field, row))}
      </tr>
    )
  }
}

export default EditRow