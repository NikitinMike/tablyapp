import React from 'react'
import './App.css'

const table = {
    headers: ['№', 'Фамилия', 'Имя', 'Отчество', 'Год', 'Адрес', 'Паспорт'], rows: [
        ['', 'jsdidhx', 'ghdhdhd', 'jfjfdjdfdsl', 356778, 'jdiow euhu wsuh', 'hdjfjikshf'],
        ['', 'uijflsdjh', 'ffffvc', 'ehjjkjf', 6899],
        ['', 'idjskf', 'vbccfff', 'dhjgfd', 57890],
        ['', 'ldfjddik', 'cgggh', 'dhjkssdffg', 35789]
    ], footers: ['', '111', '222', 'sum', '', '', '']
}

const App = () =>
    <div className='App'>
        <Tab cols="5" table={table}/>
    </div>

const Head = ({headers, cols}) =>
    <thead>
    <tr>
        {headers.slice(0, cols).map((header, index) =>
            <th key={index}>{header ? header : index}</th>)}
    </tr>
    </thead>

const Data = ({text}) => <td>{text}</td>

const Body = ({rows, cols}) =>
    <tbody>
    {rows.map((row, index) =>
        <tr key={index}>
            <td>{index}</td>
            {row.slice(1, cols).map((text, index) => <Data key={index} text={text}/>)}
        </tr>
    )}
    </tbody>

const Footer = ({cols, footers}) =>
    <tfoot>
    <tr>
        {footers.slice(0, cols).map(
            (text, index) => <td key={index}>{text ? text : index}</td>
        )}
    </tr>
    </tfoot>

const Tab = ({cols, table}) =>
    <div>
        <table rules='all' frame='border'>
            <Head headers={table.headers} cols={cols}/>
            <Body rows={table.rows} cols={cols}/>
            <Footer cols={cols} footers={table.footers}/>
        </table>
    </div>

export default App