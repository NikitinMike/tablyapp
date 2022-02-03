import React from 'react'
import './App.css'

const headers = ['№', 'Фамилия', 'Имя', 'Отчество', 'Год', 'Адрес', 'Паспорт']
const footers = ['', '111', '222', 'sum', '', '', '']

const Header = ({headers, cols}) =>
  <thead>
  <tr>
    {headers.slice(0, cols).map((header, index) =>
      <th key={index}>{header ? header : index}</th>)}
  </tr>
  </thead>

const Footer = ({cols, footers}) =>
  <tfoot>
  <tr>
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

const Body = ({rows, cols}) =>
  <tbody>
  {rows.map((row, rowIndex) =>
    <tr key={rowIndex}>
      <td>{row.id}</td>
      <Data key={'firstName' + rowIndex} text={row.firstName}/>
      <Data key={'lastName' + rowIndex} text={row.lastName}/>
      <Data key={'email' + rowIndex} text={row.email}/>
      <Data key={'phone' + rowIndex} text={row.phone}/>
      <Data key={'city' + rowIndex} text={row.city}/>
      <Data key={'country' + rowIndex} text={row.country}/>
    </tr>
  )}
  </tbody>

const Data = ({text, id}) =>
  <td id={id} key={id} onClick={(e) => consoleLog(id, e)}>
    {text}
  </td>

function consoleLog(id, e) {
  console.log(e.target)
  // e.target.style.background = e.target.style.background ? '' : 'RED'
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
        <Table table={{headers, rows, footers}} cols="7" caption="SPREADSHEET"/>
      </div>
    )
  }

  componentDidMount() {
    fetch('http://localhost:3000/contacts')
      .then(response => response.json())
      .then(data => this.setState({rows: data, isLoaded: true}))
      .catch(e => console.log(e))
  }
}

export default App
