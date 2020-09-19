import React from 'react';
import './App.css';
import Slider from '@material-ui/core/Slider'
import Frame from './Frame'
import './bootstrap/css/bootstrap.min.css';
import './index.css';
import logo from './data.svg';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';





var color_modes = {'dark' : "#282c34", 'bright' : '#fff4d1'}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.initial_nb_vertical_bars = 5
    this.max_speed = - 100
    this.min_speed = - 3000
    this.initial_speed = - (this.max_speed + this.min_speed) / 2 

    this.style = {
      color:color_modes['bright'],
      backgroundColor:color_modes['dark'],
      margin:"auto", 
    }


    this.state = {
      nb_vertical_bars: this.initial_nb_vertical_bars,
      speed: this.initial_speed, 
      style:this.style
    }


    this.changeNumberVerticalBars = this.changeNumberVerticalBars.bind(this);
    this.changeSpeed = this.changeSpeed.bind(this);
    this.changeBackgroundColor = this.changeBackgroundColor.bind(this);
  }


  changeNumberVerticalBars(event, new_value) {
    this.setState((state) => {
      if (!isNaN(new_value)) {
        return { nb_vertical_bars: new_value }
      }
      else {
        return { nb_vertical_bars: 2 }
      }

    }, () => {
      console.log("App refreshed.")
    })
  }

  changeBackgroundColor(event) {
    var new_style = {margin:this.state.style.margin}
    if (this.state.style.backgroundColor === color_modes['bright']) {
      event.target.innerHTML = 'Bright Mode'
      new_style.backgroundColor = color_modes['dark']
      new_style.color = color_modes['bright']
      // new_style.borderColor = color_modes['bright']
    }
    else {
      event.target.innerHTML = 'Dark Mode'
      new_style.backgroundColor = color_modes['bright']
      new_style.color = color_modes['dark']
      // new_style.borderColor = color_modes['dark']
    }
    this.setState((state) => {
      this.style = new_style
      return {style:new_style}
    }, () => {
      console.log("Background color changed")
    })
  }

  changeSpeed(event, new_value) {
    this.setState((state) => {
      if (!isNaN(new_value)) {
        return { speed: - new_value }
      }
      else {
        return { speed: this.initial_speed }
      }

    }, () => {
      console.log("App refreshed.")
    })
  }

  render() {
    var navbar = <Navbar bg="dark" variant="dark">
    <Nav style={{color:color_modes['bright']}}>
      Sorting algorithms
    </Nav>
    <Form inline>
      {/* <FormControl type="text" placeholder="Search" className="mr-sm-2" /> */}
      {/* <Button variant="outline-light">Search</Button> */}
    </Form>
  </Navbar>
    var presentation = <div id="welcome">
    <img style={{ height: "4cm" }} src={logo} className="App-logo" alt="logo" />
    <p>
      Welcome in VisuHelp
  </p>
    <Button
      id="backgroundColorChangeButton"
      type="checkbox"
      // variant="secondary"
      style={{backgroundColor:this.state.style.color, color:this.state.style.backgroundColor}}
      onClick={this.changeBackgroundColor}
    >
      Light Mode
    </Button>

  </div>
    
    
    var app = <div style={this.state.style}>

        {navbar}
        {presentation}
        <div style={{ fontSize: "15px" }}>Number of vertical bars : <Slider defaultValue={parseInt(this.state.nb_vertical_bars)} min={3} max={10} id="id_input_nb_bars" type="range" step={1} onChange={this.changeNumberVerticalBars}></Slider> </div>
        <br></br>
        <div style={{ fontSize: "15px" }}>Speed :<Slider defaultValue={- this.initial_speed} min={this.min_speed} max={this.max_speed} id="id_input_speed" type="range" onChange={this.changeSpeed}></Slider></div>

        {/* Thanks https://www.flaticon.com/authors/kiranshastry */}
        <Frame style={this.state.style} speed={parseInt(this.state.speed)} nb_vertical_bars={parseInt(this.state.nb_vertical_bars)}></Frame>
    </div>
    console.log("Done")
    return app
  }
}



export default App;


