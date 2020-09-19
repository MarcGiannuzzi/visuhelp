import React from 'react';
import ReactDOM from 'react-dom';
<<<<<<< HEAD

import './bootstrap/css/bootstrap.min.css';
import './index.css';


import App from './App';


import * as serviceWorker from './serviceWorker';


ReactDOM.render(
    <React.StrictMode>
      <App></App>
    </React.StrictMode>,
  document.getElementById('app')
=======
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
>>>>>>> 9d880c3e6fbdd26b3090cf72d3035ff7c83f687c
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
