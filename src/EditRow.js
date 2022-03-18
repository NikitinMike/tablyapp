import React from 'react'
import Fields from './Fields'
import './App.css'

// const Input = () => <input hidden={true}/>
// onKeyPress={(e)=>edit(e)}

class EditRow extends React.Component {

    row = null
    index = 0

    editData(e, row) {
        console.log(row)
        const td = e.target // .lastChild
        // const td = this.props.children
        // const td = React.Children.toArray()
        // e.target.style.background = e.target.style.background ? '' : 'RED'
        // if(td && td.localName==='input') td.hidden=false
        console.log('TD:', td)
        // td = <input/>
        // td.focused=true
    }

    input(col, row) {
        // console.log(row[col])
        return (
            <td>
                {/*<input key={col} value={row[col]}/>*/}
                <input key={col} value={row[col]} onChange={(e) => this.editData(e, row)}/>
            </td>
        )
    }

    constructor(props) {
        super(props);
        this.row = this.props.row
        this.index = this.row.id
        this.state = {row: this.row, index: this.index};
        console.log(this.state)
        // console.log(this.row)
    }

    render() {
        const row = this.state.row
        const id = row.id;
        return (
            <tr key={"edit"}>
                <td>{this.state.index}</td>
                {this.input(Fields[0], row)}
                {this.input(Fields[1], row)}
                {this.input(Fields[2], row)}
                {this.input(Fields[3], row)}
                {this.input(Fields[4], row)}
                {this.input(Fields[5], row)}
            </tr>
        )
    }
}

export default EditRow