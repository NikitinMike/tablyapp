import React from 'react'
import './App.css'
import Row from './Row'
import EditRow from './EditRow'

class Body extends React.Component {

  constructor(props) {
    super(props);
    this.table = props.table
    this.state = {index: 0};
    this.select = this.select.bind(this);
  }

  select(index) {
    this.setState({index: index})
  }

  getRow(row, index) {
    return row.id === this.state.index
      ? <EditRow key={row.id} row={row} index={index}/>
        : <Row key={index} row={row} index={index}
               select={this.select} getPage={this.props.getData}/>
  }

  mapRows(table) {
    return (table.map((row, index) => this.getRow(row, index)))
  }

  render() {
    return (<tbody>{this.mapRows(this.table)}</tbody>)
  }
}

export default Body
