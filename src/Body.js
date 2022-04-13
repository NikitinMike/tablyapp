import React from 'react'
import './App.css'
import Row from './Row'
import EditRow from './EditRow'

class Body extends React.Component {

  rows = []
  index = 0

  constructor(props) {
    super(props);
    this.rows = props.rows
    this.state = {rows: this.rows, index: this.index};
    this.select = this.select.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.addRow = this.addRow.bind(this);
  }

  addRow(row) {
    fetch('http://localhost:3000/contacts/', {
      headers: {
        // 'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(row)
    })
      .then(response => response.json())
      .then(res => {
        console.log(res)
        this.rows.push(res)
        this.setState({rows: this.rows})
      })
      .catch(e => console.log(e))
  }

  deleteRow(index) {
    // console.log(index)
    const row = this.rows[index]
    // console.log(row)
    fetch('http://localhost:3000/contacts/' + row.id, {method: 'DELETE'})
      .then(response => response.json())
      .then(data => {
        console.log(data)
        this.rows.splice(index,1)
        this.setState({rows:this.rows})
      })
      .catch(e => console.log(e))
  }

  select(index) {
    this.index = index
    this.setState({index: this.index})
  }

  getRow(row, index) {
    return ((row.id === this.state.index)
        ? <EditRow key={row.id} row={row} index={index}/>
        : <Row key={index} row={row} index={index}
               select={this.select} deleteRow={this.deleteRow} addRow={this.addRow}/>
    )
  }

  mapRows() {
    return (this.rows.map((row, index) => this.getRow(row, index)))
  }

  render() {
    return (<tbody>{this.mapRows()}</tbody>)
  }
}

export default Body
