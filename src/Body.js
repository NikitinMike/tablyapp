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
        this.state = {rows: this.rows};
        // console.log(this.state)
        this.select = this.select.bind(this);
    }

    select(e,id) {
        // console.log("ROW",e.target.parentElement)
        console.log(e.target)
        this.index = id
        // this.index = e.target.parentElement.childNodes[0];
        this.setState({index: this.index})
        console.log(this.index)
    }
    
    render() {
        return (
            <tbody>
            {this.rows.map((row, rowIndex) => (row.id === this.index)
                ? <EditRow key={'editRow'} row={this.rows[0]} rowIndex={0}/>
                : <Row key={row.id} row={row} rowIndex={rowIndex} select={this.select}/>
            )}
            </tbody>
        )
    }
}

export default Body
