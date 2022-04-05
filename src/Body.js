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
  }

  select(e, id) {
    this.index = id
    this.setState({index: this.index})
  }

  getRow(row, index) {
    return ((row.id === this.state.index)
        ? <EditRow key={row.id} row={row} index={index}/>
        : <Row key={index} row={row} index={index} select={this.select}/>
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
