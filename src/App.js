import React from 'react';
import ReactDOM from 'react-dom';
import logo from './data.svg';
import './App.css';

import VerticalBar from './VerticalBar'
import Frame from './Frame'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nb_vertical_bars : this.props.nb_vertical_bars,
      speed : this.props.speed
    }
  }
  render(){
    var welcome = <div className="App">
      <header className="App-header">
      {/* Thanks https://www.flaticon.com/authors/kiranshastry */}
      
        <Frame nb_vertical_bars={this.state.nb_vertical_bars}></Frame>
      </header>
    </div>
    return (
      welcome
    );
  }
}
  


export default App;
