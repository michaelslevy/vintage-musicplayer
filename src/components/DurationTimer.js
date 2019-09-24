import React from 'react';
import { connect } from 'react-redux'
import AudioPlayback from '../helpers/AudioPlayback'

const mapStateToProps = (store) => {
  return {
    playing: store.audioPlayback.playing
  }
}

class DurationTimer extends React.Component {

    mySelf=this;
    timerInterval=0;
    buffer=false;

     constructor(props) {
       super(props);
       this.state = {
         duration: "0:00",
         countDown:"0:00",
         elapsedTime:0
       };
       clearInterval(this.timerInterval);
     }

     componentDidMount(){
       this.timerInterval=setInterval(()=>this.runTimer() ,1000);
     }

     componentWillUnmount(){
       clearInterval(this.timerInterval);
     }

    runTimer=function(){
      if(AudioPlayback.buffers){this.buffer=AudioPlayback.buffers[0];}

      //reset timer if stopped
      if(this.props.playing==="stopped"){
        clearInterval(this.timerInterval);
        this.setState({elapsedTime:0, countDown:"0:00" });
        return false;
      }
      else if(!this.buffer || !AudioPlayback.buffers || this.props.playing!=="playing"){
        return false;
      }

      let duration=this.formatTime(this.buffer.duration);
      let elapsedTime=AudioPlayback.getElapsedTime();
      //this.state.elapsedTime+1;
      let countDown=this.formatTime(elapsedTime);

      this.setState({duration, elapsedTime, countDown });
    }

    formatTime=function(totalTime){
      let hours=Math.floor(totalTime/60);
      let seconds=this.pad(parseInt(totalTime%60),2);
      return hours+':'+seconds;
    }

    pad = function(num, size) {
      if (num.toString().length >= size) return num;
      return ( Math.pow( 10, size ) + Math.floor(num) ).toString().substring( 1 );
    }


    render(){

      return <p id='duration'>{this.state.countDown}/{this.state.duration}</p>

    }

}

export default connect(mapStateToProps)(DurationTimer);
