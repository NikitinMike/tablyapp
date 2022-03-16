import React from 'react'
import Body from './Body'
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
        {footers.slice(0, cols).map((text, index) =>
            <td key={index}>{text ? text : index}</td>)}
    </tr>
    </tfoot>

class Table extends React.Component {

    headers = ['№', 'Фамилия', 'Имя', 'Отчество', 'Год', 'Адрес', 'Паспорт']
    footers = ['', '111', '222', 'sum', '', '', '']
    caption = ''
    cols = 7
    table = []

    constructor(props) {
        super(props);
        this.table = props.table
        this.state = {table: this.table};
        // console.log(this.state)
    }

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
