import React from 'react'
import './App.css'

const tableContent = {
    headers: ['№', 'Фамилия', 'Имя', 'Отчество', 'Год', 'Адрес', 'Паспорт'], rows: [
        [],
        ['', 'jsdidhx', 'ghdhdhd', 'jfjfdjdfdsl', 356778, 'jdiow euhu wsuh', 'hdjfjikshf'],
        ['', 'uijflsdjh', 'ffffvc', 'ehjjkjf', 6899,'fiky ukioogy gh','gustukhhg'],
        ['', 'idjskf', 'vbccfff', 'dhjgfd', 57890, 'fhjjffg gjhh','fhiuturdgu'],
        ['', 'ldfjddik', 'cgggh', 'dhjkssdffg', 35789,'uuesfibuy ufff','gikofgh'],
    ], footers: ['', '111', '222', 'sum', '', '', '']
}

const App = () =>
    <div className='App'>
        <Table table={tableContent} cols="7"/>
    </div>

const Header = ({headers, cols}) =>
    <thead>
    <tr>
        {headers.slice(0, cols).map((header, index) =>
            <th key={index}>{header ? header : index}</th>)}
    </tr>
    </thead>

const Data = ({text, id}) =>
    <td id={id} key={id}
        onClick={(e) => consoleLog(id, e)}
    >{text}</td>

function consoleLog(id,e) {
    console.log(e.target)
    e.target.style.background= e.target.style.background?'':'RED'
}

const Body = ({rows, cols}) =>
    <tbody>
    {rows.map((row, rowIndex) => !rowIndex ? null :
        <tr key={rowIndex}>
            <td>{rowIndex}</td>
            {row.slice(1, cols).map((text, colIndex) =>
                <Data id={rowIndex * 100 + colIndex + 1} key={colIndex} text={text}/>)}
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

const Table = ({cols, table}) =>
    <div>
        <table rules='all' frame='border'>
            <Header headers={table.headers} cols={cols}/>
            <Body rows={table.rows} cols={cols}/>
            <Footer cols={cols} footers={table.footers}/>
        </table>
    </div>

export default App