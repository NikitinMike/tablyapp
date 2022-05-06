import React from 'react'
import Page from './Page'
import './App.css'
import {UserContext, ThemeContext, AuthContext, DataService} from "./DataService";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as PropTypes from "prop-types";

class App extends React.Component {

  // async componentDidMount() {
  //   const token = await DataService.tokenGet('john', 'changeme')
  //   console.log(token)
  // }

  render() {
    const {signedInUser, theme} = this.props;
    return <div className='App'>
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
          <AuthContext.Provider value={undefined}>
            <Page cols="7" rows="10" caption=" C O N T A C T S "/>
          </AuthContext.Provider>
        </UserContext.Provider>
      </ThemeContext.Provider>
    </div>
  }
}

export default App
