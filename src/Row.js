import React from 'react'
import './App.css'
import {DataServiceConst} from "./DataService";

class Row extends React.Component {

  constructor(props) {
    super(props);
    this.data = props.data
    this.index = props.index
    this.row = props.row
    this.state = {edit: false, changed: false};
    this.fields = Object.keys(this.row).slice(1)
  }

  componentWillUnmount() {
    // console.log(this.state,this.index,this.row)
    if (this.state.edit && this.state.changed)
      this.data.putRow(this.row).then(r => console.log(r))
  }

  async getRow(id) {
    this.row = await this.data.getRow(id)
    this.setState({edit: false, changed: false});
  }

  addRow(row) {
    this.data.addRow(row).then(() => this.data.getPage(0))
  }

  async deleteRow(index) {
    this.data.deleteRow(this.row.id).then(() => this.data.getPage(0))
  }

  editData(e, row, col) {
    const td = e.target // .lastChild
    // e.target.style.background = e.target.style.background ? '' : 'RED'
    if (td.value === row[col]) return
    row[col] = td.value
    this.row = row
    this.setState({changed: true})
  }

  inputField(col,i, row) {
    return <td key={col + row.id}>
      <input value={row[col]} color={'RED'} size={DataServiceConst.Size[i]}
             onChange={(e) => this.editData(e, row, col)}/>
    </td>
  }

  editRow(index) {
    return <tr key={index}>
      <td id={index}>{this.row.id}</td>
      {this.fields.map((f,i) => this.inputField(f,i, this.row))}
      <td onClick={() => this.getRow(this.row.id).then(() => console.log(this.row))}
          hidden={!this.state.changed}>
        [ xxx ]
      </td>
    </tr>
  }

  select(index) {
    // console.log(index)
    this.setState({edit: true})
  }

  dataField(col, row) {
    return <td key={col + row.id}>{row[col]}</td>
  }

  showRow(index) {
    return <tr key={index} onClick={() => this.select(index)}>
      <td onClick={() => this.addRow({...this.row})}>
        <div>{index}:{this.row.id}</div>
      </td>
      {this.fields.map(f => this.dataField(f, this.row))}
      <td onClick={() => this.deleteRow(index)}>
        <button>[XXX]</button>
      </td>
    </tr>
  }

  render() {
    return this.state.edit ? this.editRow(this.index) : this.showRow(this.index)
  }
}

export default Row