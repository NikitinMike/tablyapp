import React from 'react'
import './App.css'
import {addRow, deleteRow} from "./DataService";
import {getRow, putRow} from "./DataService";

class Row extends React.Component {

  constructor(props) {
    super(props);
    this.index = props.index
    this.row = props.row
    this.state = {edit: false};
    this.fields = Object.keys(props.row).slice(1)
    this.select = this.select.bind(this);
  }

  select(index) {
    console.log(index)
    this.setState({index: index})
  }

  componentWillUnmount() {
    // console.log(this.state,this.index,this.row)
    if (this.state.edit) putRow(this.row).then(r => console.log(r))
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

  show() {
    return <tr key={this.index} onClick={() => this.select(this.index)}>
      <td onClick={() => this.addRow({...this.row})}>
        <div>{this.index}:{this.row.id}</div>
      </td>
      {this.fields.map(field => this.data(field, this.row))}
      <td onClick={() => this.deleteRow(this.index)}>
        <button>[XXX]</button>
      </td>
    </tr>
  }

  editData(e, row, col) {
    const td = e.target // .lastChild
    // e.target.style.background = e.target.style.background ? '' : 'RED'
    if (td.value === row[col]) return
    row[col] = td.value
    this.row = row
    this.setState({edit: true})
  }

  input(col, row) {
    return <td key={col + row.id}>
      <input value={row[col]} color={'RED'} size={12}
             onChange={(e) => this.editData(e, row, col)}/>
    </td>
  }

  async getRow(id) {
    this.row = await getRow(id)
    this.setState({edit: false});
  }

  edit() {
    return <tr key={this.index}>
      <td id={this.index}>{this.row.id}</td>
      {this.fields.map(field => this.input(field, this.row))}
      <td onClick={() => this.getRow(this.row.id).then(() => console.log(this.row))}
          hidden={!this.state.edit}>
        [ xxx ]
      </td>
    </tr>
  }

  render() {
    return true ?this.show(): this.edit()
  }
}

export default Row