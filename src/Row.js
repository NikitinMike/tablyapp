import React from 'react'
import Fields from './Fields'
import './App.css'

class Row extends React.Component {

  row = null
  index = 0

  selectCol(e, id) {
    // console.log("ROW",e.target.parentElement)
    console.log(this.index)
    // this.index = id
    // this.index = e.target.parentElement.childNodes[0];
    // this.setState({index: this.index})
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
    this.index = props.index
    this.state = {row: this.row, index: this.index};
  }

  render() {
    const row = this.state.row
    const id = row.id;
    return (
      <tr key={this.state.index} onClick={(e) => this.props.select(e, id)}>
        <td onClick={() => this.props.addRow({...row})}>{id}</td>
        {Fields.map(field => this.data(field, row))}
        <td onClick={(e) => this.props.deleteRow(e, id)}>[X]</td>
      </tr>
    )
  }
}

export default Row