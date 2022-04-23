import React from 'react'
import './App.css'
import Row from './Row'
import EditRow from './EditRow'

class Body extends React.Component {

  constructor(props) {
    super(props);
    this.table = props.table
    this.state = {index: null};
    this.select = this.select.bind(this);
  }

  select(index) {
    this.setState({index: index})
  }

  getRow(row, index) {
    return this.state.index === index
      ? <EditRow key={row.id} row={row} index={index}/>
        : <Row key={index} row={row} index={index}
               select={this.select} getPage={this.props.getData}/>
  }

  render() {
    return <tbody>{this.table.map((row, i) => this.getRow(row, i))}</tbody>
  }
}

export default Body
