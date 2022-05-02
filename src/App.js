import React from 'react'
import Page from './Page'
import './App.css'
import {UserContext, ThemeContext, AuthContext} from "./DataService";
import 'bootstrap/dist/css/bootstrap.min.css';
import * as PropTypes from "prop-types";

class App extends React.Component {
  render() {
    const {signedInUser, theme} = this.props;
    return <div className='App'>
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
          <AuthContext.Provider value={undefined}>
            <Layout/>
            <Page cols="7" rows="10" caption=" C O N T A C T S "/>
          </AuthContext.Provider>
        </UserContext.Provider>
      </ThemeContext.Provider>
    </div>
  }
}

function Sidebar() {
  return null;
}

function Layout() {
  return <div>
    <Sidebar/>
    <Content/>
  </div>
}

function ProfilePage(props) {
  return null;
}

ProfilePage.propTypes = {
  theme: PropTypes.string,
  user: PropTypes.shape({name: PropTypes.string})
};

// Компонент, который может использовать несколько контекстов
function Content() {
  return <ThemeContext.Consumer>
    {theme => (
      <UserContext.Consumer>
        {user => (<ProfilePage name={user} theme={theme}/>)}
      </UserContext.Consumer>
    )}
  </ThemeContext.Consumer>
}

export default App
