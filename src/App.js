import React from 'react'
import Page from './Page'
import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import * as PropTypes from "prop-types";

// Контекст UI-темы, со светлым значением по умолчанию
const ThemeContext = React.createContext('light');

// Контекст активного пользователя
const UserContext = React.createContext({
  name: 'Guest',
});

class App extends React.Component {
  render() {
    const {signedInUser, theme} = this.props;
    return <div className='App'>
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
          <Layout/>
          <Page cols="7" rows="10" caption=" C O N T A C T S "/>
        </UserContext.Provider>
      </ThemeContext.Provider>
    </div>
  }
}

function Sidebar() {
  return null;
}

function Layout() {
  return (
    <div>
      <Sidebar/>
      <Content/>
    </div>
  );
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
  return (
    <ThemeContext.Consumer>
      {theme => (
        <UserContext.Consumer>
          {user => (
            <ProfilePage user={user} theme={theme}/>
          )}
        </UserContext.Consumer>
      )}
    </ThemeContext.Consumer>
  );
}

export default App
