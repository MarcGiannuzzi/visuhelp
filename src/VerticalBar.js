import React from 'react';


class VerticalBar extends React.Component {


    constructor(props) {
      super(props);
        this.value = this.props.value
        this.vertical_bar_style = {
          height: "" + (this.props.value + 1) + "cm", 
          width: "0.8cm",
          border: "0.1cm solid white",
          borderRadius: "5px",
          backgroundColor:"green",
          color: "white", 
          textAlign: "center", 
          padding:"auto" ,
          margin:"auto"
        }

        this.state = {style: this.vertical_bar_style};
    }

    setBackgroundColor = (color) => {
      var new_style = {
        height: "" + (this.props.value + 1) + "cm", 
        width: "0.8cm",
        border: "0.1cm solid white",
        borderRadius: "5px",
        backgroundColor:color,
        color: "white", 
        textAlign: "center", 
        padding:"auto" ,
        margin:"auto"
      }
      this.setState({style : new_style}) 
    }
    
    // Avec les refs, cette declaration ne marchait pas  ! : setBackgroundColor(color){
    //   var new_style = this.vertical_bar_style
    //   new_style['backgroundColor'] = color
    //   this.setState({style : new_style}) 
    // }
    
    render() {
      return <div style={this.state.style}>{this.props.value + 1}</div>
    }
  }


export default VerticalBar;
