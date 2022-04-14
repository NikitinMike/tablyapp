import React from 'react'
import Body from './Body'
import './App.css'
import Fields, {Headers} from './Fields'
import {Footers} from './Fields'

class Table extends React.Component {

    header(cols) {
        return (
            <thead>
            <tr onClick={() => this.getData(-1)}>
            {/*<tr>*/}
                {Headers.slice(0, cols).map((header, index) =>
                    <th key={index} id={Fields[index - 1]}
                        onClick={(e) => {
                            if (e.target.id) this.getData(0, e.target.id)
                        }}>
                        {header ? header : index}
                    </th>)}
            </tr>
            </thead>
        )
    }

    footer(cols) {
        return (
            <tfoot>
            <tr onClick={() => this.getData(+1)}>
                {Footers.slice(0, cols).map((text, index) =>
                    <td key={index}>{text ? text : index}</td>)}
            </tr>
            </tfoot>
        )
    }

    caption = ''
    cols = 9
    table = []

    constructor(props) {
        super(props);
        this.table = props.table
        this.caption = props.caption
        this.state = {table: this.table};
        this.getData = this.props.getData
    }

    render() {
        return (
            <div>
                <table rules='all' frame='border'>
                    <caption>{this.caption}</caption>
                    {this.header(this.cols)}
                    <Body rows={this.state.table} cols={this.cols} getPage={this.getData}/>
                    {this.footer(this.cols)}
                </table>
            </div>
        )
    }
}

export default Table
