import React from 'react'
import './App.css'
import Row from './Row'
import EditRow from './EditRow'

class Body extends React.Component {

  table = []
  index = 0

  constructor(props) {
    super(props);
    this.table = props.table
    this.state = {table: this.table, index: this.index};
    this.select = this.select.bind(this);
  }

  select(index) {
    this.index = index
    this.setState({index: this.index})
  }

  getRow(row, index) {
    return ((row.id === this.state.index)
        ? <EditRow key={row.id} row={row} index={index}/>
        : <Row key={index} row={row} index={index}
               select={this.select} getPage={this.props.getPage}/>
    )
  }

  mapRows() {
    return (this.table.map((row, index) => this.getRow(row, index)))
  }

  render() {
    return (<tbody>{this.mapRows()}</tbody>)
  }
}

export default Body
