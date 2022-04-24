import React from 'react'
import './App.css'
import {DataService} from "./DataService";

class Row extends React.Component {

  constructor(props) {
    super(props);
    this.index = props.index
    this.row = props.row
    this.state = {edit: false,changed:false};
    this.fields = Object.keys(props.row).slice(1)
    // this.select = this.select.bind(this);
  }

  select(index) {
    // console.log(index)
    this.setState({edit: true})
  }

  componentWillUnmount() {
    // console.log(this.state,this.index,this.row)
    if (this.state.edit && this.state.changed) DataService.putRow(this.row).then(r => console.log(r))
  }

  addRow(row) {
    DataService.addRow(row).then(() => this.props.getPage(0))
  }

  async deleteRow(index) {
    DataService.deleteRow(this.row.id).then(() => this.props.getPage(0))
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

  editData(e, row, col) {
    const td = e.target // .lastChild
    // e.target.style.background = e.target.style.background ? '' : 'RED'
    if (td.value === row[col]) return
    row[col] = td.value
    this.row = row
    this.setState({changed: true})
  }

  inputField(col, row) {
    return <td key={col + row.id}>
      <input value={row[col]} color={'RED'} size={12}
             onChange={(e) => this.editData(e, row, col)}/>
    </td>
  }

  async getRow(id) {
    this.row = await DataService.getRow(id)
    this.setState({edit: false,changed:false});
  }

  editRow(index) {
    return <tr key={index}>
      <td id={index}>{this.row.id}</td>
      {this.fields.map(f => this.inputField(f, this.row))}
      <td onClick={() => this.getRow(this.row.id).then(() => console.log(this.row))}
          hidden={!this.state.changed}>
        [ xxx ]
      </td>
    </tr>
  }

  render() {
    return this.state.edit ? this.editRow(this.index) : this.showRow(this.index)
  }
}

export default Row