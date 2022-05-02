import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App signedInUser={'john'} theme={'dark'} />,
  document.getElementById('root'));

serviceWorker.unregister();
