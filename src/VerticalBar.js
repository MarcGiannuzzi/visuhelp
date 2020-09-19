import React from 'react';


class VerticalBar extends React.Component {


    constructor(props) {
      super(props);
        this.value = this.props.value
        this.width = this.props.width
        this.vertical_bar_style = {
          width: "0.8cm",
          fontSize: "0.5cm",
          height: "" + (this.props.value + 1) + "cm", 
          border: "0.1cm solid white",
          borderRadius: "5px",
          backgroundColor:"green",
          color: "#fff4d1", 
          textAlign: "center", 
          padding:"auto" ,
          margin:"auto",
          marginBottom:"1cm",
          borderColor:"black"
        }

        this.state = {style: this.vertical_bar_style};
    }

    componentWillReceiveProps({width}) {
      this.width = width
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
