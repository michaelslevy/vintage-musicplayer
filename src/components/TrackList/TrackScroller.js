import React, { Component } from 'react';
import { connect } from 'react-redux'

import SimpleKnob  from '../UI/SimpleKnob'
import SortSwitch from "../UI/SortSwitch"
import {setTrackScroll}  from '../../actions/tracks'

const mapStateToProps = (store) => {
  return {
    trackScroll: store.tracks.scroll
  }
}

//function passed to Reduxes Connect to dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    setTrackScroll: (scroll) => dispatch(setTrackScroll(scroll))
  }
}

class TrackScroller extends Component {

    scrollTracks=function(value){
      const scrollAreaContent=document.querySelector("#trackHolder .scrollarea-content");
      let scrollAreaContentHeight=scrollAreaContent.clientHeight;
      let scrollAreaHeight=document.querySelector("#trackHolder .scrollarea").clientHeight;
      let steps=parseInt(scrollAreaContentHeight/scrollAreaHeight);
      let position=(value/100)*(scrollAreaContentHeight-scrollAreaHeight)*(-1);
      let steppedPosition=Math.round(position/steps)*steps;
      scrollAreaContent.style.marginTop=steppedPosition+"px";
    }

    //update store to sync track scrollbar to track knob
    adjustKnob=function(scroll){
      this.props.setTrackScroll(scroll);
    }

    render(){
      return(
      <div className='trackScroller' id='trackScroller'>
        <SimpleKnob label='Tracks' id='trackKnob' rotation={this.props.trackScroll} min={0} max={100} adjustKnob={this.adjustKnob.bind(this)} action={this.scrollTracks.bind(this)} />
        <SortSwitch />
      </div>
    );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(TrackScroller);
