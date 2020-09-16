import React from 'react';
import ReactDOM from 'react-dom';
import logo from './data.svg';
import './App.css';

import VerticalBar from './VerticalBar'
import Frame from './Frame'





class App extends React.Component {
  constructor(props) {
    super(props)

    this.initial_nb_vertical_bars = 5
    this.state = {
      nb_vertical_bars : this.initial_nb_vertical_bars,
      speed : this.props.speed
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

  render(){
    var app = <div>
    <span style={{fontSize:"15px"}}>Number of vertical bars : </span>
    <input defaultValue={parseInt(this.state.nb_vertical_bars)} style={{fontSize:"15px", width:"2cm"}} id="id_input_nb_bars" onChange={this.changeNumberVerticalBars}/>
     <div className="App">
      <header className="App-header">
      {/* Thanks https://www.flaticon.com/authors/kiranshastry */}
        <Frame  nb_vertical_bars={parseInt(this.state.nb_vertical_bars)}></Frame>
      </header>
    </div>
</div>
    return app
  }
}
  


export default App;
