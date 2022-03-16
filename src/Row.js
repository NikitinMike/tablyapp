import React from 'react'
import Fields from './Fields'
import './App.css'

async function addRow(data) {
    await fetch('http://localhost:3000/contacts/',
        {
            headers: {
                // 'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(res => {
            console.log(res)
        })
        .catch(e => console.log(e))
    window.location.reload();
}

function deleteRow(e, row) {
    console.log(row)
    fetch('http://localhost:3000/contacts/' + row, {method: 'DELETE'})
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(e => console.log(e))
    window.location.reload();
}

class Row extends React.Component {

    row = null
    index = 0

    data(col, row) {
        return (
            <td onClick={(e) => {
                // this.select(e,col,row)
                console.log(row.id, col, row);
            }}>
                {/*<Input />*/}
                {row[col]}
            </td>
        )
    }

    constructor(props) {
        super(props);
        this.row = props.row
        this.state = {row: this.row, index: this.index};
        // console.log(this.state)
    }

    select(e,id) {
        // console.log("ROW",e.target.parentElement)
        this.index = id
        // this.index = e.target.parentElement.childNodes[0];
        this.setState({index: this.index})
        console.log(this.index)
    }

    render() {
        const row = this.state.row
        const id = row.id;
        return (
            <tr key={this.state.index} onClick={(e) => this.props.select(e,id)}>
                <td onClick={(e) => addRow(row)}>{id}</td>
                {/*{Fields.forEach(field => {this.data(field,row)} )}*/}
                {this.data(Fields[0],row)}
                {this.data(Fields[1],row)}
                {this.data(Fields[2],row)}
                {this.data(Fields[3],row)}
                {this.data(Fields[4],row)}
                {this.data(Fields[5],row)}
                {/*<td onClick={(e) => editRow(e, row.id)}>[...]</td>*/}
                <td onClick={(e) => deleteRow(e, id)}>[X]</td>
            </tr>
        )
    }
}

export default Row