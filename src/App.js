import React from 'react'
import './App.css'

// const headers= ['№', 'Фамилия', 'Имя', 'Отчество', 'Год', 'Адрес', 'Паспорт']
// const footers= ['', '111', '222', 'sum', '', '', '']
// const rows= [[]]

const Header = ({headers, cols}) =>
    <thead>
    <tr>
        {headers.slice(0, cols).map((header, index) =>
            <th key={index}>{header ? header : index}</th>)}
    </tr>
    </thead>

const Data = ({text, id}) =>
    <td id={id} key={id} onClick={(e) => consoleLog(id, e)}>
        {/*<input type='text' className='form-control' name={'ftd' + id} />*/}
        {text}
    </td>

function consoleLog(id, e) {
    console.log(e.target)
    // e.target.style.background = e.target.style.background ? '' : 'RED'
}

const rows = [
    ['', 'jsdidhx', 'ghdhdhd', 'jfjfdjdfdsl', 356778, 'jdiow euhu wsuh', 'hdjfjikshf',],
    ['', 'uijflsdjh', 'ffffvc', 'ehjjkjf', 6899, 'fiky ukioogy gh', 'gustukhhg',],
    ['', 'idjskf', 'vbccfff', 'dhjgfd', 57890, 'fhjjffg gjhh', 'fhiuturdgu'],
    ['', 'ldfjddik', 'cgggh', 'dhjkssdffg', 35789, 'uuesfibuy ufff', 'gikofgh'],
];

const Body = ({ cols}) =>
    <tbody>
    {/*{console.log('TBL:',rows)}*/}
    {rows.map((row, rowIndex) =>
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

const Table = ({cols, table, caption}) =>
    <div>
        <table rules='all' frame='border'>
            <caption>{caption}</caption>
            {/*<Header headers={table.headers} cols={cols}/>*/}
            <Body rows={table.rows} cols={cols}/>
            {/*<Footer cols={cols} footers={table.footers}/>*/}
        </table>
    </div>

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            rows: [[1,2,3,4,5,6,7],[1,2,3,4,5,6,7],]
        };
    }

    render() {
        return (
            <div className='App'>
                {/*<form className='form-control'>*/}
                <Table table= {{rows:this.state.rows}} cols="7" caption="SPREADSHEET"/>
                {/*</form>*/}
            </div>
        )
    }

    componentDidMount() {
        fetch('http://localhost:3000/')
            .then(response => response.json())
            .then(data => {
                this.setState({rows:data})
                // this.setState({table: {headers,data,footers}})
                console.log(this.state.rows)
            })
            .catch(e => console.log(e))
    }
}

export default App
