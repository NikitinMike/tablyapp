import React from 'react'
import Table from './Table'
import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

    rows = []
    page = 1
    order = null
    direction = false

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            rows: this.rows,
            page: this.page,
            order: this.order,
            dir: this.direction
        };
        this.getData = this.getData.bind(this);
    }

    render() {
        this.rows = this.state.rows
        return this.state.isLoaded && (
            <div className='App'>
                <form>
                    <Table table={this.rows} cols="7" caption="C O N T A C T S" getData={this.getData}/>
                </form>
            </div>
        )
    }

    async componentDidMount() {
        await this.getData(0).then(r => console.log(r))
    }

    async getData(next, order) {
        if (order != null)
            if (order !== this.order) this.order = order
            else this.direction = !this.direction
        console.log(order,this.direction)
        if (next > 1) this.page = next
        else this.page += (this.rows.length > 0) ? next : -1
        if (this.page < 0) this.page = 0;
        this.setState({isLoaded: false})
        // if(this.direction) this.rows = this.rows.reverse()
        await fetch((this.order ? 'http://localhost:3000/contacts/' + this.order
            : 'http://localhost:3000/contacts') + '/page' + this.page)
            .then(response => response.json())
            .then(data => this.rows = data)
            .catch(e => console.log(e))
        this.setState({rows: this.rows, isLoaded: true, page: this.page, order: this.order})
    }
}

export default App
