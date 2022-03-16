import React from 'react'
import Fields from './Fields'
import './App.css'

function select(e, col, row) {
}

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

const Data = ({col, row}) =>
    <td onClick={(e) => {
        // index = row.id;
        // console.log(e.target.parentElement);
        console.log(row.id, col, row);
    }}>
        {/*<Input />*/}
        {row[col]}
    </td>

class Row extends React.Component {

    row = null
    index = 0

    constructor(props) {
        super(props);
        this.row = props.row
        this.state = {row: this.row, index: this.index};
        // console.log(this.state)
    }

    render() {
        const row = this.state.row
        const id = row.id;
        return (
            <tr key={this.state.index}>
                <td onClick={(e) => addRow(row)}>{id}</td>
                {/*{fields.forEach(field => {<Data col={field} row={row}/>} )}*/}
                <Data col={Fields[0]} row={row}/>
                <Data col={Fields[1]} row={row}/>
                <Data col={Fields[2]} row={row}/>
                <Data col={Fields[3]} row={row}/>
                <Data col={Fields[4]} row={row}/>
                <Data col={Fields[5]} row={row}/>
                {/*<td onClick={(e) => editRow(e, row.id)}>[...]</td>*/}
                <td onClick={(e) => deleteRow(e, id)}>[X]</td>
            </tr>
        )
    }
}

export default Row