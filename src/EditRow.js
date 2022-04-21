import React from 'react'
import Fields, {Site} from './Fields'
import './App.css'
import {getRow, putRow} from "./DataService";

class EditRow extends React.Component {

  editData(e, row, col) {
    const td = e.target // .lastChild
    // e.target.style.background = e.target.style.background ? '' : 'RED'
    if (td.value === row[col]) return
    row[col] = td.value
    this.setState({row: row, edit: true})
  }

  input(col, row) {
    return <td key={col + row.id}>
      <input value={row[col]} color={'RED'} size={12}
             onChange={(e) => this.editData(e, row, col)}/>
    </td>
  }

  async getRow(row) {
    this.setState({row: await getRow(row.id), edit: false});
  }

  componentWillUnmount() {
    if (this.state.edit) putRow(this.state.row).then(r => console.log(r))
  }

  constructor(props) {
    super(props);
    this.index = props.index
    this.state = {row: props.row, edit: false};
    this.fields = Object.keys(props.row).slice(1)
  }

  render() {
    return <tr key={"edit"}>
      <td id={this.index}>{this.state.row.id}</td>
      {this.fields.map(field => this.input(field, this.state.row))}
      <td onClick={() => this.getRow(this.state.row).then(r => console.log(r))}
          hidden={!this.state.edit}>
        [ xxx ]
      </td>
    </tr>
  }
}

export default EditRow