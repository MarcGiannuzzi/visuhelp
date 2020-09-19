import React from 'react';

import VerticalBar from './VerticalBar'
import { Grid, Row, Col } from 'react-flexbox-grid';

import Button from 'react-bootstrap/Button';

import ButtonGroup from 'react-bootstrap/ButtonGroup';

class Frame extends React.Component {
    constructor(props) {
        super(props);
        this.nb_vertical_bars = this.props.nb_vertical_bars
        this.speed = this.props.speed
        this.refsVerticalBars = this.createVerticalBarsRefs(this.nb_vertical_bars)
        this.vertical_bars = this.createVerticalBars()
        this.frame = this.createFrame()
        
        this.state = {
            frame: this.frame, 
        }


        this.createVerticalBars = this.createVerticalBars.bind(this);
        this.createFrame = this.createFrame.bind(this);
        this.modifyFrame = this.modifyFrame.bind(this);
        this.bubbleSort = this.bubbleSort.bind(this);
        this.mergeSort = this.mergeSort.bind(this);
        this.quickSort = this.quickSort.bind(this);
        this.insertionSort = this.insertionSort.bind(this);
    }

    componentWillReceiveProps({nb_vertical_bars, speed, new_style}) {
        if(this.nb_vertical_bars === nb_vertical_bars){
            this.speed = speed
        }
        else{
            this.nb_vertical_bars = nb_vertical_bars
            this.refsVerticalBars = this.createVerticalBarsRefs(nb_vertical_bars)
            this.vertical_bars = this.createVerticalBars()
            this.modifyFrame()
        }
    }

    createVerticalBarsRefs(nb_vertical_bars){
        var refsVerticalBars = []
        for(let i = 0; i < nb_vertical_bars; i++){
            var ref = React.createRef()
            refsVerticalBars.push(ref)
        }
        return refsVerticalBars
    }
    
    createVerticalBars(new_vertical_bars=null){
        if(new_vertical_bars === null){
            return Array.from(Array(this.nb_vertical_bars).keys()).map(index => 
                <Col key={index} style={{flexBasis:"0", margin:'auto'}} xs={1} md={1}><VerticalBar ref={this.refsVerticalBars[index]} value={index} width={10 / this.nb_vertical_bars}></VerticalBar></Col>)
        }
        else{
            return new_vertical_bars
        }
        

    }

    createFrame(){
        var frame =  <Grid fluid>
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
            frame =  <Grid fluid>
            <Row style={{margin:"1cm"}}>
                {this.vertical_bars}
            </Row>
        </Grid>
        }
        else{
            frame =  <Grid fluid>
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



    

    shuffleFrame(){
        var refsVerticalBars = this.createVerticalBarsRefs(this.nb_vertical_bars)
        this.refsVerticalBars = refsVerticalBars
        var vertical_bars = this.createVerticalBars()
        this.vertical_bars = vertical_bars
        this.modifyFrame()


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
        this.modifyFrame()
        console.log("Finished shuffling frame.")
        this.pause = false
      
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
        
        //Compare the two sub arrays and merge them in the sorted order
        while (left < left_limit && right < right_limit) {
            for(let i = intial_left; i < initial_right + 1; i++){
                vertical_bars_refs[i].current.setBackgroundColor('orange')
            }
            await this.delay(this.speed)
            

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
            await this.delay(this.speed)
        }
      
        //If there are elements in the left sub arrray then add it to the result
        while (left < left_limit) {
            vertical_bars_refs[index].current.setBackgroundColor('blue')
            await this.delay(this.speed)
            vertical_bars_refs[index].current.setBackgroundColor('green')
            await this.delay(this.speed)
          buffer[index] = vertical_bars[left];
          buffer_refs[index++] = vertical_bars_refs[left++];
        }
      
        //If there are elements in the right sub array then add it to the result
        while (right < right_limit) {
            vertical_bars_refs[index].current.setBackgroundColor('blue')
            await this.delay(this.speed)
            vertical_bars_refs[index].current.setBackgroundColor('green')
            await this.delay(this.speed)
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
          this.createVerticalBars(vertical_bars)
          this.modifyFrame(vertical_bars)
        }
      }

     
    async bubbleSort(){
        console.log("User chose Bubble sorting algorithm.")
        var vertical_bars = this.vertical_bars.slice()
        var length_array_vertical_bars = vertical_bars.length
      

        for(let current_index = 0; current_index < length_array_vertical_bars - 1; current_index++){
            this.refsVerticalBars[current_index].current.setBackgroundColor('orange')
            await this.delay(this.speed)
            var current_vertical_bar = vertical_bars[current_index]
            var current_value_vertical_bar = current_vertical_bar.props.children.props.value
            for(let compare_index = current_index + 1; compare_index < length_array_vertical_bars; compare_index++){
                var compare_vertical_bar = vertical_bars[compare_index]
                var compare_value_vertical_bar = compare_vertical_bar.props.children.props.value
                

                if (current_value_vertical_bar > compare_value_vertical_bar){
                    this.refsVerticalBars[current_index].current.setBackgroundColor('red')
                    this.refsVerticalBars[compare_index].current.setBackgroundColor('red')

                    this.createVerticalBars(vertical_bars)
                    await this.delay(this.speed)
                    
                    var tmp_vertical_bar = current_vertical_bar
                    vertical_bars[current_index] = compare_vertical_bar
                    vertical_bars[compare_index] = tmp_vertical_bar

                    var tmp_refVerticalBar = this.refsVerticalBars[current_index]
                    this.refsVerticalBars[current_index] = this.refsVerticalBars[compare_index]
                    this.refsVerticalBars[compare_index] = tmp_refVerticalBar

                    
                    this.modifyFrame(vertical_bars)
                    await this.delay(this.speed)
                    this.refsVerticalBars[current_index].current.setBackgroundColor('green')
                    this.refsVerticalBars[compare_index].current.setBackgroundColor('green')
                    await this.delay(this.speed)
                    current_vertical_bar = vertical_bars[current_index]
                    current_value_vertical_bar = current_vertical_bar.props.children.props.value
                    console.log("Vertical bars swapped")
                }
            }
            this.refsVerticalBars[current_index].current.setBackgroundColor('green')
        }
    }


    async partition(vertical_bars, start_index, end_index){
        var smallest_index = start_index - 1
        var pivot = vertical_bars[end_index].props.children.props.value
        this.refsVerticalBars[end_index].current.setBackgroundColor('blue')
        await this.delay(this.speed)


        for(let current_index = start_index; current_index < end_index; current_index++){
            this.refsVerticalBars[current_index].current.setBackgroundColor('orange')
            await this.delay(this.speed)
            if(vertical_bars[current_index].props.children.props.value < pivot){
                smallest_index += 1
                
                if(smallest_index !== current_index){
                    this.refsVerticalBars[current_index].current.setBackgroundColor('red')
                    this.refsVerticalBars[smallest_index].current.setBackgroundColor('red')
                    await this.delay(this.speed)

                    let tmp_vertical_bar = vertical_bars[smallest_index]
                    vertical_bars[smallest_index] = vertical_bars[current_index]
                    vertical_bars[current_index] = tmp_vertical_bar
                    await this.delay(this.speed)

                    
                    // this.createVerticalBars(vertical_bars)
                    this.modifyFrame(vertical_bars)

                    let tmp_refVerticalBar = this.refsVerticalBars[smallest_index]
                    this.refsVerticalBars[smallest_index] = this.refsVerticalBars[current_index]
                    this.refsVerticalBars[current_index] = tmp_refVerticalBar

                    this.refsVerticalBars[current_index].current.setBackgroundColor('green')
                    this.refsVerticalBars[smallest_index].current.setBackgroundColor('green')
                    await this.delay(this.speed)
            }

            }
            this.refsVerticalBars[current_index].current.setBackgroundColor('green')
            await this.delay(this.speed)
        }
        if(smallest_index + 1 !== end_index){
            this.refsVerticalBars[smallest_index + 1].current.setBackgroundColor('red')
            await this.delay(this.speed)
    
            let tmp_vertical_bar = vertical_bars[smallest_index + 1]
            vertical_bars[smallest_index + 1] = vertical_bars[end_index]
            vertical_bars[end_index] = tmp_vertical_bar
            await this.delay(this.speed)
    
            // this.createVerticalBars(vertical_bars)
            this.modifyFrame(vertical_bars)
    
            var tmp_refVerticalBar = this.refsVerticalBars[smallest_index + 1]
            this.refsVerticalBars[smallest_index + 1] = this.refsVerticalBars[end_index]
            this.refsVerticalBars[end_index] = tmp_refVerticalBar
    
            this.refsVerticalBars[smallest_index + 1].current.setBackgroundColor('green')
        }
        this.refsVerticalBars[end_index].current.setBackgroundColor('green')
        return smallest_index + 1
    }


    async quickSort(){
        console.log("User chose Quick sorting algorithm.")
        var vertical_bars = this.vertical_bars.slice()
        var start_index = 0
        var size = vertical_bars.length
        var end_index = size - 1
        var stack = Array(size)

        var top_of_stack =  -1

        top_of_stack += 1
        stack[top_of_stack] = start_index
        top_of_stack += 1
        stack[top_of_stack] = end_index

        while(top_of_stack >= 0){
            end_index = stack[top_of_stack]
            top_of_stack -= 1
            start_index = stack[top_of_stack]
            top_of_stack -= 1

            var p = await this.partition(vertical_bars, start_index, end_index)

            if(p - 1 > start_index){
                top_of_stack += 1
                stack[top_of_stack] = start_index
                top_of_stack += 1
                stack[top_of_stack] = p - 1
            }

            if(p + 1 < end_index){
                top_of_stack += 1
                stack[top_of_stack] = p + 1
                top_of_stack += 1
                stack[top_of_stack] = end_index
            }
        }

        this.refsVerticalBars = this.createVerticalBarsRefs(this.nb_vertical_bars)
        this.vertical_bars = this.createVerticalBars()
    }



    async insertionSort() {
        var vertical_bars = this.vertical_bars.slice()
            for (let current_index = 1; current_index < vertical_bars.length; current_index++) {
                var compare_index = current_index; 
                var compare_vertical_bar_value = vertical_bars[compare_index].props.children.props.value
                var before_compare_vertical_bar_value = vertical_bars[compare_index - 1].props.children.props.value

                while (compare_index > 0 && compare_vertical_bar_value < before_compare_vertical_bar_value) {
                    this.refsVerticalBars[compare_index - 1].current.setBackgroundColor('red')
                    this.refsVerticalBars[compare_index].current.setBackgroundColor('red')
                    await this.delay(this.speed)

                    var tmp_vertical_bar = vertical_bars[compare_index]
                    vertical_bars[compare_index] = vertical_bars[compare_index - 1]
                    vertical_bars[compare_index - 1] = tmp_vertical_bar

                    var tmp_ref_vertical_bar = this.refsVerticalBars[compare_index]  
                    this.refsVerticalBars[compare_index] = this.refsVerticalBars[compare_index - 1]   
                    this.refsVerticalBars[compare_index - 1] =  tmp_ref_vertical_bar

                    this.modifyFrame(vertical_bars)
                    await this.delay(this.speed)

                    
                    this.refsVerticalBars[compare_index - 1].current.setBackgroundColor('green')
                    this.refsVerticalBars[compare_index].current.setBackgroundColor('green')
                    await this.delay(this.speed)
                                
                    compare_index -= 1
                    if(compare_index > 0){
                        compare_vertical_bar_value = vertical_bars[compare_index].props.children.props.value
                        before_compare_vertical_bar_value = vertical_bars[compare_index - 1].props.children.props.value
                    }
                }

            }
        this.refsVerticalBars = this.createVerticalBarsRefs(this.nb_vertical_bars)
        this.vertical_bars = this.createVerticalBars()    }

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
            <Button variant="secondary" onClick={(event) => {
                this.quickSort()
            }}>Quick sort</Button>
            <Button variant="secondary" onClick={(event) => {
                this.insertionSort()
            }}>Insertion sort</Button>
          </ButtonGroup>
          
          <hr></hr>
          
          {this.state.frame}
        </div>
        return element_returned
    }
  }


export default Frame;




