import React from 'react'
import Fields from './Fields'
import './App.css'

// const Input = () => <input hidden={true}/>
// onKeyPress={(e)=>edit(e)}
const Input = ({col, row}) =>
    <td>
        {/*<input key={col} value={row[col]}/>*/}
        <input key={col}/>
    </td>

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

class EditRow extends React.Component {

    row = null
    index = 0

    constructor(props) {
        super(props);
        this.row = props.rowIndex
        this.state = {row: this.row, index: this.index};
        // console.log(this.state)
    }

    render() {
        const row = this.state.row
        const id = row.id;
        return (
            <tr key={"edit"}>
                <td>{this.state.index}</td>
                <Input col={Fields[0]} row={row}/>
                <Input col={Fields[1]} row={row}/>
                <Input col={Fields[2]} row={row}/>
                <Input col={Fields[3]} row={row}/>
                <Input col={Fields[4]} row={row}/>
                <Input col={Fields[5]} row={row}/>
            </tr>
        )
    }
}

export default EditRow