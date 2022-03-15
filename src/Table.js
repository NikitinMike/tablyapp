import React from 'react'
import './App.css'

const Header = ({headers, cols}) =>
    <thead>
    <tr onClick={(e) => addRow({})}>
        {headers.slice(0, cols).map((header, index) =>
            <th key={index}>{header ? header : index}</th>)}
    </tr>
    </thead>

const Footer = ({cols, footers}) =>
    <tfoot>
    <tr onClick={(e) => addRow({})}>
        {footers.slice(0, cols).map(
            (text, index) => <td key={index}>{text ? text : index}</td>
        )}
    </tr>
    </tfoot>

async function getRow(id) {
    await fetch('http://localhost:3000/contacts/' + id, {method: 'GET'})
        .then(response => response.json())
        .then(async data => {
            console.log(data)
        })
        .catch(e => console.log(e))
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

function select(e,col,row){

}

const Data = ({col, row}) =>
    <td onClick={(e) => {index=row.id;
        console.log(index,e.target.parentElement, col, row);}}>
        {/*<Input />*/}
        {row[col]}
    </td>

const Row = ({row, rowIndex}) =>
    <tr key={rowIndex}>
        <td onClick={(e) => addRow(row)}>{row.id}</td>
        {/*this.fields.forEach(field => this.row[field]='')*/}
        <Data col={fields[0]} row={row}/>
        <Data col={fields[1]} row={row}/>
        <Data col={fields[2]} row={row}/>
        <Data col={fields[3]} row={row}/>
        <Data col={fields[4]} row={row}/>
        <Data col={fields[5]} row={row}/>
        <td onClick={(e) => editRow(e, row.id)}>[...]</td>
        <td onClick={(e) => deleteRow(e, row.id)}>[X]</td>
    </tr>

const EditRow = ({row, rowIndex}) =>
    <tr key={"edit"}>
        <td>{rowIndex}</td>
        <Input col={fields[0]} row={row}/>
        <Input col={fields[1]} row={row}/>
        <Input col={fields[2]} row={row}/>
        <Input col={fields[3]} row={row}/>
        <Input col={fields[4]} row={row}/>
        <Input col={fields[5]} row={row}/>
    </tr>

const Input = ({col, row}) =>
    <td>
        {/*<input key={col} value={row[col]}/>*/}
        <input key={col}/>
    </td>
// const Input = () => <input hidden={true}/>
// onKeyPress={(e)=>edit(e)}

const Body = ({rows, cols,index}) =>
    <tbody>
    {rows.map((row, rowIndex) =>
        (row.id == index) ? <EditRow key={'editRow'} row={rows[0]} rowIndex={0}/>
            : <Row key={row.id} row={row} rowIndex={rowIndex}/>
    )}
    </tbody>

function editRow(e, row) {
    console.log(row)
    const td = e.target.lastChild
    // const td = this.props.children
    // const td = React.Children.toArray()
    // e.target.style.background = e.target.style.background ? '' : 'RED'
    // if(td && td.localName==='input') td.hidden=false
    console.log('TD:', td)
    // td = <input/>
    // td.focused=true
}

function deleteRow(e, row) {
    console.log(row)
    fetch('http://localhost:3000/contacts/' + row, {method: 'DELETE'})
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(e => console.log(e))
    window.location.reload();
}

function consoleLog(id, e) {
    console.log(e.target)
}

const fields = ['firstName', 'lastName', 'email', 'phone', 'city', 'country']
let index = 0

class Table extends React.Component {

    headers = ['№', 'Фамилия', 'Имя', 'Отчество', 'Год', 'Адрес', 'Паспорт']
    footers = ['', '111', '222', 'sum', '', '', '']
    caption = ''
    cols = 7
    table = []

    constructor(props) {
        super(props);
        console.log(props.table)
        this.table = props.table
        this.state = {
            error: null,
            isLoaded: false,
            table: this.table
        };
    }

    // const Table = ({cols, table, caption}) =>
    render(props) {
        return (
            <div>
                <table rules='all' frame='border'>
                    <caption>{this.caption}</caption>
                    <Header headers={this.headers} cols={this.cols}/>
                    <Body rows={this.state.table} cols={this.cols} index={this.index}/>
                    <Footer cols={this.cols} footers={this.footers}/>
                </table>
            </div>
        )
    }
}

export default Table
