import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Slider from '@material-ui/core/Slider'
import VerticalBar from './VerticalBar'
import Frame from './Frame'
import { green } from '@material-ui/core/colors';




class App extends React.Component {
  constructor(props) {
    super(props)

    this.initial_nb_vertical_bars = 5
    this.max_speed = - 100
    this.min_speed = - 3000
    this.initial_speed = - (this.max_speed + this.min_speed) / 2 // speed should go from 0 to 100
    this.state = {
      nb_vertical_bars : this.initial_nb_vertical_bars,
      speed : this.initial_speed
    }
    this.changeNumberVerticalBars = this.changeNumberVerticalBars.bind(this);
    this.changeSpeed = this.changeSpeed.bind(this);
  }


  changeNumberVerticalBars(event, new_value){
    this.setState((state) => {
      if(!isNaN(new_value)){
        return {nb_vertical_bars:new_value}
      }
      else{
        return {nb_vertical_bars:2}
      }
      
    }, () => {
      console.log("App refreshed.")
    })
  }


  changeSpeed(event, new_value){
    this.setState((state) => {
      if(!isNaN(new_value)){
        return {speed:- new_value}
      }
      else{
        return {speed:this.initial_speed}
      }
      
    }, () => {
      console.log("App refreshed.")
    })
  }

  render(){
    var app = <div>
      <div>
        <span style={{fontSize:"15px"}}>Number of vertical bars : <Slider defaultValue={parseInt(this.state.nb_vertical_bars)} min={3} max={10} id="id_input_nb_bars" type="range" step={1} onChange={this.changeNumberVerticalBars}></Slider> </span>
        <br></br>
        <span style={{fontSize:"15px"}}>Speed :<Slider defaultValue={- this.initial_speed} min={this.min_speed} max={this.max_speed} id="id_input_speed" type="range" onChange={this.changeSpeed}></Slider></span>
      </div>
    
     <div className="App">
      <header className="App-header">
      {/* Thanks https://www.flaticon.com/authors/kiranshastry */}
        <Frame speed={parseInt(this.state.speed)} nb_vertical_bars={parseInt(this.state.nb_vertical_bars)}></Frame>
      </header>
    </div>
</div>
    return app
  }
}
  


export default App;


