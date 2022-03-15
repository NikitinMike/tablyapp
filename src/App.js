import React from 'react'
import Table from './Table'
import './App.css'

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
                    <Table table={rows} cols="7" caption="C O N T A C T S"/>
                </form>
            </div>
        )
    }

    componentDidMount() {
        this.getData().then(r => console.log(r) );
    }

    async getData() {
        await fetch('http://localhost:3000/contacts')
            .then(response => response.json())
            .then(data => this.setState({rows: data, isLoaded: true}))
            .catch(e => console.log(e))
    }
}

export default App
