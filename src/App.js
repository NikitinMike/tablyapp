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

const Input = () => <input hidden={true}/>
// onKeyPress={(e)=>edit(e)}

const Data = ({col, text, row}) =>
    <td onClick={(e) => console.log(e, col, text, row)}>
      {/*<Input />*/}
      {text}
    </td>

const Body = ({rows, cols}) =>
  <tbody>
  {rows.map((row, rowIndex) =>
    <tr key={rowIndex}>
      <td key={row.id} onClick={(e) => addRow(row)}>{row.id}</td>
      <Data col={'firstName'} text={row.firstName} row={row.id}/>
      <Data col={'lastName'} text={row.lastName} row={row.id}/>
      <Data col={'email'} text={row.email} row={row.id}/>
      <Data col={'phone'} text={row.phone} row={row.id}/>
      <Data col={'city'} text={row.city} row={row.id}/>
      <Data col={'country'} text={row.country} row={row.id}/>
      <td onClick={(e) => editRow(e, row.id)}>[...]</td>
      <td onClick={(e) => deleteRow(e, row.id)}>[X]</td>
    </tr>
  )}
  </tbody>

function editRow(e, row) {
  console.log(row)
  const td = e.target.lastChild
  // const td = this.props.children
  // const td = React.Children.toArray()
  // e.target.style.background = e.target.style.background ? '' : 'RED'
  // if(td && td.localName==='input') td.hidden=false
  console.log(td)
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
