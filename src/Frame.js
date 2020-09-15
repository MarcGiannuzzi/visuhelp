import React from 'react';
import memoize from "memoize-one";

import VerticalBar from './VerticalBar'
import { Grid, Row, Col } from 'react-flexbox-grid';

import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import setBackgroundColor from './VerticalBar'

class Frame extends React.Component {
    constructor(props) {
        super(props);
        this.style = {
            border: "1px solid white",
            borderRadius:"5px", 
            margin:"auto", 
            width: "95%"
        }
        this.nb_vertical_bars = this.props.nb_vertical_bars
        this.refsVerticalBars = this.createVerticalBarsRefs()
        this.vertical_bars = this.createVerticalBars()
        // console.log(this.vertical_bars)
        this.frame = this.createFrame()
        // console.log(this.frame)
        
        this.state = {
            frame: this.frame, 
        }


        this.createVerticalBars = this.createVerticalBars.bind(this);
        this.createFrame = this.createFrame.bind(this);
        this.modifyFrame = this.modifyFrame.bind(this);
        this.modifyArrayVerticalBars = this.modifyArrayVerticalBars.bind(this);
        this.bubbleSort = this.bubbleSort.bind(this);
        this.mergeSort = this.mergeSort.bind(this);

    }

    componentWillReceiveProps({nb_vertical_bars}) {
        this.nb_vertical_bars = nb_vertical_bars
        this.refsVerticalBars = this.createVerticalBarsRefs()
        this.vertical_bars = this.createVerticalBars()
        this.modifyFrame()
    }

    createVerticalBarsRefs(){
        var refsVerticalBars = []
        for(let i = 0; i < this.nb_vertical_bars; i++){
            var ref = React.createRef()
            console.log("ref : ", React.createRef())
            refsVerticalBars.push(ref)
        }
        return refsVerticalBars
    }
    
    createVerticalBars(new_vertical_bars=null){
        if(new_vertical_bars === null){
            return Array.from(Array(this.nb_vertical_bars).keys()).map(index => 
                <Col key={index} style={{flexBasis:"0", margin:'auto'}} xs={1} md={1}><VerticalBar ref={this.refsVerticalBars[index]} value={index} ></VerticalBar></Col>)
        }
        else{
            return new_vertical_bars
        }
        

    }

    createFrame(){
        var frame =  <Grid fluid style={this.style}>
                        <Row style={{margin:"1cm"}}>
                            {this.vertical_bars}
                        </Row>
                    </Grid>
        console.log("Frame created.")
        return frame
    }


    

    modifyFrame(new_vertical_bars=null){
        var frame = null
        if(new_vertical_bars === null){
            frame =  <Grid fluid fluid style={this.style}>
            <Row style={{margin:"1cm"}}>
                {this.vertical_bars}
            </Row>
        </Grid>
        }
        else{
            frame =  <Grid fluid fluid style={this.style}>
            <Row style={{margin:"1cm"}}>
                {new_vertical_bars}
            </Row>
        </Grid>
        }
        
        this.setState((state) => {
            return {frame:frame}
        }, () => {
            console.log("Frame refreshed.")
        })
    }


    modifyArrayVerticalBars(new_vertical_bars){
        var updated_vertical_bars = new_vertical_bars.map((vertical_bar, index) => {
            var new_value_vertical_bar = vertical_bar.props.children.props.value
            return <Col key={new_value_vertical_bar} style={{flexBasis:"0", margin:"auto"}} xs={1} md={1} ><VerticalBar ref={this.refsVerticalBars[index]} value={new_value_vertical_bar} ></VerticalBar></Col>
        })
        this.setState((state) => {
            return {vertical_bars:updated_vertical_bars}
        })
        return updated_vertical_bars

    }
    

    shuffleFrame(){
        var frame = this.state.frame
        var vertical_bars = this.vertical_bars.slice()
        var length_array_vertical_bars = vertical_bars.length
        var currentIndex = length_array_vertical_bars, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
        
            // And swap it with the current element.
            temporaryValue = vertical_bars[currentIndex];
            vertical_bars[currentIndex] = vertical_bars[randomIndex];
            vertical_bars[randomIndex] = temporaryValue;

            var tmp_refVerticalBar = this.refsVerticalBars[currentIndex]
            this.refsVerticalBars[currentIndex] = this.refsVerticalBars[randomIndex]
            this.refsVerticalBars[randomIndex] = tmp_refVerticalBar
        }
        this.vertical_bars = this.createVerticalBars(vertical_bars)
        this.modifyFrame()
        console.log("Finished shuffling frame.")
      
    }


    sortFrame(){
        
    }

    delay(n) {  
        console.log("Delay")
        n = n || 2000;
        return new Promise(done => {
          setTimeout(() => {
            done();
          }, n);
        });
      }
      //https://blog.praveen.science/right-way-of-delaying-execution-synchronously-in-javascript-without-using-loops-or-timeouts/
      

    async merge(left, right, left_limit, right_limit, vertical_bars, vertical_bars_refs, buffer, buffer_refs){
        let index = left;
        let intial_left = left
        let initial_right = right
        console.log("vertical_bars_refs : ", vertical_bars_refs)
        
        //Compare the two sub arrays and merge them in the sorted order
        while (left < left_limit && right < right_limit) {
            for(let i = intial_left; i < initial_right + 1; i++){
                vertical_bars_refs[i].current.setBackgroundColor('orange')
            }
            await this.delay(1000)
            

            if (vertical_bars[left].props.children.props.value <= vertical_bars[right].props.children.props.value) {
                buffer[index] = vertical_bars[left];
                buffer_refs[index++] = vertical_bars_refs[left++];
            } else {
                buffer[index] = vertical_bars[right];
                buffer_refs[index++] = vertical_bars_refs[right++];
            }

            for(let i = intial_left; i < initial_right + 1; i++){
                vertical_bars_refs[i].current.setBackgroundColor('green')
            }
            await this.delay(1000)
        }
      
        //If there are elements in the left sub arrray then add it to the result
        while (left < left_limit) {
            vertical_bars_refs[index].current.setBackgroundColor('blue')
            await this.delay(1000)
            vertical_bars_refs[index].current.setBackgroundColor('green')
            await this.delay(1000)
          buffer[index] = vertical_bars[left];
          buffer_refs[index++] = vertical_bars_refs[left++];
        }
      
        //If there are elements in the right sub array then add it to the result
        while (right < right_limit) {
            vertical_bars_refs[index].current.setBackgroundColor('blue')
            await this.delay(1000)
            vertical_bars_refs[index].current.setBackgroundColor('green')
            await this.delay(1000)
            buffer[index] = vertical_bars[right];
            buffer_refs[index++] = vertical_bars_refs[right++];
        }
      }


    async mergeSort(){
        console.log("User chose Merge sorting algorithm.")
        var vertical_bars = this.vertical_bars.slice()
        var vertical_bars_refs = this.refsVerticalBars.slice()
        var length_array_vertical_bars = vertical_bars.length
        var buffer = new Array(length_array_vertical_bars)
        var buffer_refs = new Array(length_array_vertical_bars)
        
        for (let size_sub_arrays = 1; size_sub_arrays < length_array_vertical_bars; size_sub_arrays *= 2) {
          for (let left_start = 0; left_start < length_array_vertical_bars; left_start += 2*size_sub_arrays) {
            
            //Get the two sub arrays
            let left = left_start,
                right = Math.min(left + size_sub_arrays, length_array_vertical_bars),
                left_limit = right,
                right_limit = Math.min(right + size_sub_arrays, length_array_vertical_bars);
            
            //Merge the sub arrays
            await this.merge(left, right, left_limit, right_limit, vertical_bars, vertical_bars_refs, buffer, buffer_refs);  
          }
          
          //Swap the sorted sub array and merge them
          let temp = vertical_bars;
          vertical_bars = buffer;
          buffer = temp;

          let temp_refs = vertical_bars_refs;
          vertical_bars_refs = buffer_refs;
          buffer_refs = temp_refs;
          this.modifyArrayVerticalBars(vertical_bars)
          this.modifyFrame(vertical_bars)
        }
        return vertical_bars;
      }

     
    async bubbleSort(){
        console.log("User chose Bubble sorting algorithm.")
        var vertical_bars = this.vertical_bars.slice()
        var length_array_vertical_bars = vertical_bars.length
      

        for(let current_index = 0; current_index < length_array_vertical_bars - 1; current_index++){
            this.refsVerticalBars[current_index].current.setBackgroundColor('orange')
            await this.delay(1000)
            var current_vertical_bar = vertical_bars[current_index]
            console.log("current_vertical_bar : ", current_vertical_bar)
            var current_value_vertical_bar = current_vertical_bar.props.children.props.value
            for(let compare_index = current_index + 1; compare_index < length_array_vertical_bars; compare_index++){
                var compare_vertical_bar = vertical_bars[compare_index]
                var compare_value_vertical_bar = compare_vertical_bar.props.children.props.value
                

                if (current_value_vertical_bar > compare_value_vertical_bar){
                    this.refsVerticalBars[current_index].current.setBackgroundColor('red')
                    this.refsVerticalBars[compare_index].current.setBackgroundColor('red')

                    this.modifyArrayVerticalBars(vertical_bars)
                    await this.delay(1000)
                    
                    var tmp_vertical_bar = current_vertical_bar
                    vertical_bars[current_index] = compare_vertical_bar
                    vertical_bars[compare_index] = tmp_vertical_bar

                    var tmp_refVerticalBar = this.refsVerticalBars[current_index]
                    this.refsVerticalBars[current_index] = this.refsVerticalBars[compare_index]
                    this.refsVerticalBars[compare_index] = tmp_refVerticalBar

                    
                    this.modifyFrame(vertical_bars)
                    await this.delay(1000)
                    this.refsVerticalBars[current_index].current.setBackgroundColor('green')
                    this.refsVerticalBars[compare_index].current.setBackgroundColor('green')
                    await this.delay(1000)
                    current_vertical_bar = vertical_bars[current_index]
                    current_value_vertical_bar = current_vertical_bar.props.children.props.value
                    console.log("Vertical bars swapped")
                }
            }
            this.refsVerticalBars[current_index].current.setBackgroundColor('green')
        }


    

        
    }


    render() {
        var element_returned = <div>
            <Button variant="warning" onClick={(event) => {
              this.shuffleFrame()
            }}>Shuffle frame</Button>
            <br></br>
          <ButtonGroup>
            <Button variant="secondary" onClick={(event) => {
              this.bubbleSort()
            }}>Bubble sort</Button>
            <Button variant="secondary" onClick={(event) => {
                this.mergeSort()
            }}>Merge sort</Button>
          </ButtonGroup>
          <hr></hr>
          
          {this.state.frame}
        </div>
        return element_returned
    }
  }


export default Frame;




