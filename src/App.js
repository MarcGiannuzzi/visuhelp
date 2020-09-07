import React from 'react';
import ReactDOM from 'react-dom';
import logo from './data.svg';
import './App.css';

import VerticalBar from './VerticalBar'
import Frame from './Frame'





class App extends React.Component {
  constructor(props) {
    super(props)

    this.initial_nb_vertical_bars = 1
    this.state = {
      nb_vertical_bars : this.initial_nb_vertical_bars,
      speed : this.props.speed
    }
  }
  render(){
    var app = <div>
    <span style={{fontSize:"15px"}}>Number of vertical bars : </span>
    <input defaultValue={parseInt(this.state.nb_vertical_bars)} style={{fontSize:"15px", width:"2cm"}} id="id_input_nb_bars" onChange={(event) => {
      var new_nb_vertical_bars = parseInt(event.target.value)
      console.log("event : ", event)
      this.setState((state) => {
        return {nb_vertical_bars:new_nb_vertical_bars}
      }, () => {
        console.log("App refreshed.")
      })
    }}/>
     <div className="App">
      <header className="App-header">
      {/* Thanks https://www.flaticon.com/authors/kiranshastry */}
      
        <Frame nb_vertical_bars={parseInt(this.state.nb_vertical_bars)}></Frame>
      </header>
    </div>
</div>
    return app
  }
}
  


export default App;
