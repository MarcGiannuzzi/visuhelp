import React from 'react';
import ReactDOM from 'react-dom';

import './bootstrap/css/bootstrap.min.css';
import './index.css';
import logo from './data.svg';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';


import App from './App';
import Frame from './Frame';

import VerticalBar from './VerticalBar'

import * as serviceWorker from './serviceWorker';


var navbar = <Navbar bg="dark" variant="dark">
  {/* <Navbar.Brand href="#home">Ginzzi</Navbar.Brand> */}
    <Nav className="mr-auto">
      <Nav.Link href="#home">Sorting algorithms</Nav.Link>
      {/* <Nav.Link href="#features">Data science</Nav.Link> */}
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-light">Search</Button>
    </Form>
  </Navbar>


ReactDOM.render(
  <React.StrictMode>
    {navbar}
  </React.StrictMode>,
  document.getElementById('navbar')
);

ReactDOM.render(
  <React.StrictMode>
    <img src={logo} className="App-logo" alt="logo" /> 
    <p>
      Welcome in VisuHelp
    </p>
    <hr></hr>
    <hr></hr>
    <hr></hr>
  </React.StrictMode>,
  document.getElementById('welcome')
);


ReactDOM.render(
  <React.StrictMode>
    <span style={{fontSize:"15px"}}>Number of vertical bars : </span>
    <input value="5" style={{fontSize:"15px", width:"2cm"}} id="id_input_nb_bars" onchange={() => {
      ReactDOM.render(
        <React.StrictMode>
          <App nb_vertical_bars={parseInt(document.getElementById("id_input_nb_bars").value)}/>
        </React.StrictMode>,
        document.getElementById('app')
      );
    }}/>
  </React.StrictMode>,
  document.getElementById('params')
);


ReactDOM.render(
  <React.StrictMode>
    <App nb_vertical_bars={parseInt(document.getElementById("id_input_nb_bars").value)}/>
  </React.StrictMode>,
  document.getElementById('app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
