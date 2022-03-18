import React from 'react'
import './App.css'
import Row from './Row'
import EditRow from './EditRow'

function consoleLog(id, e) {
    console.log(e.target)
}

async function getRow(id) {
    await fetch('http://localhost:3000/contacts/' + id, {method: 'GET'})
        .then(response => response.json())
        .then(async data => {
            console.log(data)
        })
        .catch(e => console.log(e))
}

class Body extends React.Component {

    rows = []
    index = 0

    constructor(props) {
        super(props);
        this.rows = props.rows
        this.state = {rows: this.rows, index: this.index};
        // console.log(this.state)
        this.select = this.select.bind(this);
    }

    select(e, id) {
        // console.log("ROW",e.target.parentElement)
        // console.log(e.target)
        this.index = id
        // this.index = e.target.parentElement.childNodes[0];
        this.setState({index: this.index})
        // console.log(this.index)
    }

    getRows() {
        // console.log(this.rows)
        // console.log(this.state.index)
        return (
            this.rows.map((row, index) => (row.id === this.state.index)
                ? <EditRow key={row.id} row={row} index={index}/>
                : <Row key={index} row={row} index={index} select={this.select}/>
            )
        )
    }

    render() {
        return (<tbody>{this.getRows()}</tbody>)
    }
}

export default Body
