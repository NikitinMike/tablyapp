import React from 'react'
import './App.css'

const headers = ['№', 'Фамилия', 'Имя', 'Отчество', 'Год', 'Адрес', 'Паспорт']
const footers = ['', '111', '222', 'sum', '', '', '']

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

const Table = ({cols, table, caption}) =>
    <div>
        <table rules='all' frame='border'>
            <caption>{caption}</caption>
            <Header headers={table.headers} cols={cols}/>
            <Body rows={table.rows} cols={cols}/>
            <Footer cols={cols} footers={table.footers}/>
        </table>
    </div>

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

const Data = ({col, row}) =>
    <td onClick={(e) => console.log(e, col, row)}>
        {/*<Input />*/}
        {row[col]}
    </td>

const Row = ({row, rowIndex}) =>
    <tr key={rowIndex}>
        <td onClick={(e) => addRow(row)}>{row.id}</td>
        <Data col={'firstName'} row={row}/>
        <Data col={'lastName'} row={row}/>
        <Data col={'email'} row={row}/>
        <Data col={'phone'} row={row}/>
        <Data col={'city'} row={row}/>
        <Data col={'country'} row={row}/>
        <td onClick={(e) => editRow(e, row.id)}>[...]</td>
        <td onClick={(e) => deleteRow(e, row.id)}>[X]</td>
    </tr>

const EditRow = ({row, rowIndex}) =>
    <tr key={"edit"}>
        <td>{rowIndex}</td>
        <Input col={'firstName'} row={row}/>
        <Input col={'lastName'} row={row}/>
        <Input col={'email'} row={row}/>
        <Input col={'phone'} row={row}/>
        <Input col={'city'} row={row}/>
        <Input col={'country'} row={row}/>
    </tr>

const Input = ({col}) =>
    <td>
        <input key={col}/>
    </td>
// const Input = () => <input hidden={true}/>
// onKeyPress={(e)=>edit(e)}

const Body = ({rows, cols}) =>
    <tbody>
        {rows.map((row, rowIndex) =>
            (rowIndex==3)? <EditRow key={'editRow'} row={rows[0]} rowIndex={0}/>
            :<Row key={row.id} row={row} rowIndex={rowIndex}/>
        )}
    </tbody>

function editRow(e, row) {
    console.log(row)
    const td = e.target.lastChild
    // const td = this.props.children
    // const td = React.Children.toArray()
    // e.target.style.background = e.target.style.background ? '' : 'RED'
    // if(td && td.localName==='input') td.hidden=false
    console.log('TD:',td)
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

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            rows: []
        };
    }

    render() {
        const rows = this.state.rows
        return (
            <div className='App'>
                <form>
                    <Table table={{headers, rows, footers}} cols="7" caption="C O N T A C T S"/>
                </form>
            </div>
        )
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        fetch('http://localhost:3000/contacts')
            .then(response => response.json())
            .then(data => this.setState({rows: data, isLoaded: true}))
            .catch(e => console.log(e))
    }
}

export default App
