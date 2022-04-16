import React from 'react'
import Fields, {Site} from './Fields'
import './App.css'

class EditRow extends React.Component {

  editData(e, row, col) {
    const td = e.target // .lastChild
    // e.target.style.background = e.target.style.background ? '' : 'RED'
    if (td.value === row[col]) return
    row[col] = td.value
    this.setState({row: row, edit: true})
  }

  input(col, row) {
    return (
      <td key={col + row.id}>
        <input value={row[col]} color={'RED'} size={12}
               onChange={(e) => this.editData(e, row, col)}/>
      </td>
    )
  }

  async getRow(row) {
    const response = await fetch(Site + '/' + row.id, {method: 'GET'})
    this.setState( {row: await response.json(), edit: false});
  }

  async putRow(index) {
    const row = this.state.row // s[this.state.index]
    await fetch(Site + '/' + row.id, {
      method: 'PUT',
      body: JSON.stringify(row),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(data => console.log(data))
      .catch(e => console.log(e))
  }

  componentWillUnmount() {
    if (this.state.edit) this.putRow(this.state.index).then(r => console.log(r))
  }

  constructor(props) {
    super(props);
    this.state = {row: props.row, index: props.index, edit: false};
  }

  render() {
    return (
      <tr key={"edit"}>
        <td>{this.state.index + 1}</td>
        {Fields.map(field => this.input(field, this.state.row))}
        <td onClick={() => this.getRow(this.state.row).then(r => console.log(r))}>
          [ xxx ]
        </td>
      </tr>
    )
  }
}

export default EditRow