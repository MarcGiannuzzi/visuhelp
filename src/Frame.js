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
                        {/* <DropdownButton as={ButtonGroup} title="Dropdown" id="bg-nested-dropdown">
                            <Dropdown.Item onClick={() => this.sortFrame('BubbleSort')}>Bubble sort</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.sortFrame('MergeSort')}>Merge sort</Dropdown.Item>
                        </DropdownButton> */}
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
            {/* <DropdownButton as={ButtonGroup} title="Dropdown" id="bg-nested-dropdown">
                <Dropdown.Item onClick={() => this.sortFrame('BubbleSort')}>Bubble sort</Dropdown.Item>
                <Dropdown.Item onClick={() => this.sortFrame('MergeSort')}>Merge sort</Dropdown.Item>
            </DropdownButton> */}
            <Row style={{margin:"1cm"}}>
                {this.vertical_bars}
            </Row>
        </Grid>
        }
        else{
            frame =  <Grid fluid fluid style={this.style}>
            {/* <DropdownButton as={ButtonGroup} title="Dropdown" id="bg-nested-dropdown">
                <Dropdown.Item onClick={() => this.sortFrame('BubbleSort')}>Bubble sort</Dropdown.Item>
                <Dropdown.Item onClick={() => this.sortFrame('MergeSort')}>Merge sort</Dropdown.Item>
            </DropdownButton> */}
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
        console.log("this.vertical_bars shuffleFrame BEFORE : ", this.vertical_bars)
        var frame = this.state.frame
        var vertical_bars = this.vertical_bars.slice()
        console.log("this.vertical_bars.slice() shuffleFrame BEFORE : ", this.vertical_bars.slice())
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
        console.log("this.vertical_bars shuffleFrame AFTER : ", this.vertical_bars)
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
      
      
    async mergeSort(){
        console.log("User chose Merge sorting algorithm.")
        
        var frame = this.state.frame
        var vertical_bars = this.vertical_bars.slice()
        var length_array_vertical_bars = vertical_bars.length
        // console.log("length_array_vertical_bars : ", length_array_vertical_bars)
        
        for(let length_sub_array = 2; length_sub_array < length_array_vertical_bars * 2; length_sub_array *= 2){
            var nb_sub_arrays = Math.floor(length_array_vertical_bars / length_sub_array)
            // console.log("nb_sub_arrays : ", nb_sub_arrays)
            for(let index_sub_array = 0; index_sub_array < nb_sub_arrays; index_sub_array++){
                for(let current_index_in_sub_array = index_sub_array * length_sub_array; current_index_in_sub_array < (index_sub_array + 1) * length_sub_array; current_index_in_sub_array++){
                    this.refsVerticalBars[current_index_in_sub_array].current.setBackgroundColor('orange')
                    
                    var current_vertical_bar = vertical_bars[current_index_in_sub_array]
                    var current_value_vertical_bar = current_vertical_bar.props.children.props.value
                    await this.delay(1000)
                    for(let compare_index_in_sub_array = current_index_in_sub_array + 1; compare_index_in_sub_array < (index_sub_array + 1) * length_sub_array; compare_index_in_sub_array++){
                        // console.log("(index_sub_array + 1) * length_sub_array : ", (index_sub_array + 1) * length_sub_array)
                        // console.log("current_index_in_sub_array : ", current_index_in_sub_array)
                        // console.log("compare_index_in_sub_array : ", compare_index_in_sub_array)
                        var compare_vertical_bar = vertical_bars[compare_index_in_sub_array]
                        var compare_value_vertical_bar = compare_vertical_bar.props.children.props.value
        
                        if (current_value_vertical_bar > compare_value_vertical_bar){
                            this.refsVerticalBars[current_index_in_sub_array].current.setBackgroundColor('red')
                            this.refsVerticalBars[compare_index_in_sub_array].current.setBackgroundColor('red')
                            await this.delay(1000)
                            
                            var tmp_vertical_bar = current_vertical_bar
                            vertical_bars[current_index_in_sub_array] = compare_vertical_bar
                            vertical_bars[compare_index_in_sub_array] = tmp_vertical_bar

                            var tmp_refVerticalBar = this.refsVerticalBars[current_index_in_sub_array]
                            this.refsVerticalBars[current_index_in_sub_array] = this.refsVerticalBars[compare_index_in_sub_array]
                            this.refsVerticalBars[compare_index_in_sub_array] = tmp_refVerticalBar
        
                            
                            this.modifyFrame(vertical_bars)
                            await this.delay(1000)
                            this.refsVerticalBars[current_index_in_sub_array].current.setBackgroundColor('green')
                            this.refsVerticalBars[compare_index_in_sub_array].current.setBackgroundColor('green')
                            await this.delay(1000)
                            current_vertical_bar = vertical_bars[current_index_in_sub_array]
                            current_value_vertical_bar = current_vertical_bar.props.children.props.value
                            console.log("Vertical bars swapped")
                        }
                    }
                    this.refsVerticalBars[current_index_in_sub_array].current.setBackgroundColor('green')
                }
            }
        }
        return vertical_bars
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
                this.mergeSort(this.vertical_bars)
            }}>Merge sort</Button>
          </ButtonGroup>
          <hr></hr>
          
          {this.state.frame}
        </div>
        return element_returned
    }
  }


export default Frame;




