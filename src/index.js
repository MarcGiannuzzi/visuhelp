import React from 'react';
import ReactDOM from 'react-dom';

import './bootstrap/css/bootstrap.min.css';
import './index.css';
import logo from './data.svg';

import Navbar from 'react-bootstrap/Navbar';
import ToggleButton from 'react-bootstrap/ToggleButton';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';


import App from './App';


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
    <img style={{height:"4cm"}} src={logo} className="App-logo" alt="logo" /> 
    <p>
      Welcome in VisuHelp
    </p>
    <Button
          id="backgroundColorChangeButton"
          type="checkbox"
          variant="secondary"
          onClick={(event) => {
            if(document.body.style.backgroundColor == 'white'){
              event.target.innerHTML = 'White Mode'
              // event.target = 'White Mode'
              document.body.style.backgroundColor = '#282c34'
              document.body.style.color = 'white'
            }
            else{
              event.target.innerHTML = 'Dark Mode'
              document.body.style.backgroundColor = 'white'
              document.body.style.color = 'black'
            }
          }}
        >
          Light Mode
        </Button>
    <br></br>
    <br></br>
    <br></br>
  </React.StrictMode>,
  document.getElementById('welcome')
);


// ReactDOM.render(
//   <React.StrictMode>
//     <span style={{fontSize:"15px"}}>Number of vertical bars : </span>
//     <input defaultValue="5" style={{fontSize:"15px", width:"2cm"}} id="id_input_nb_bars" onChange={() => {
//       ReactDOM.render(
//         <React.StrictMode>
//           <App/>
//         </React.StrictMode>,
//         document.getElementById('app')
//       );
//     }}/>
//   </React.StrictMode>,
//   document.getElementById('params')
// );


ReactDOM.render(
    <React.StrictMode>
      <App></App>
    </React.StrictMode>,
  document.getElementById('app')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
