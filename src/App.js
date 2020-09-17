import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Slider from '@material-ui/core/Slider'
import VerticalBar from './VerticalBar'
import Frame from './Frame'





class App extends React.Component {
  constructor(props) {
    super(props)

    this.initial_nb_vertical_bars = 5
    this.initial_speed = 50 // speed should go from 0 to 100
    this.state = {
      nb_vertical_bars : this.initial_nb_vertical_bars,
      speed : this.initial_speed
    }
    this.changeNumberVerticalBars = this.changeNumberVerticalBars.bind(this);
  }


  changeNumberVerticalBars(event){
    var new_nb_vertical_bars = parseInt(event.target.value)
    console.log("new_nb_vertical_bars :", new_nb_vertical_bars)
    console.log("event : ", event)
    this.setState((state) => {
      if(!isNaN(new_nb_vertical_bars)){
        return {nb_vertical_bars:new_nb_vertical_bars}
      }
      else{
        return {nb_vertical_bars:2}
      }
      
    }, () => {
      console.log("App refreshed.")
    })
  }


  changeSpeed(event){
    var new_speed = parseInt(event.target.value)
    console.log("new_speed :", new_speed)
    console.log("event : ", event)
    this.setState((state) => {
      if(!isNaN(new_speed)){
        return {speed:new_speed}
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
    <span style={{fontSize:"15px"}}>Number of vertical bars : </span>
    <input defaultValue={parseInt(this.state.nb_vertical_bars)}  id="id_input_nb_bars" onChange={this.changeNumberVerticalBars}/>
    <br></br>
    <span style={{fontSize:"15px"}}>Speed : <Slider min="1" max="100" type="range" id="id_input_speed" onChange={this.changeSpeed}></Slider> </span>
    
     <div className="App">
      <header className="App-header">
      {/* Thanks https://www.flaticon.com/authors/kiranshastry */}
        <Frame speed={parseInt(300 + 7 * this.state.speed)} nb_vertical_bars={parseInt(this.state.nb_vertical_bars)}></Frame>
      </header>
    </div>
</div>
    return app
  }
}
  


export default App;


