import React from 'react';
import { connect } from 'react-redux'
import DurationTimer from './DurationTimer'
import HTMLReactParser from "html-react-parser"

const mapStateToProps = (store) => {
  return {
    trackTitle: store.audioPlayback.title,
    trackAuthor: store.audioPlayback.author,
    loading: store.audioPlayback.loading
  }
}

//function passed to Reduxes Connect to dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {

  }
}

class PlaybackDisplay extends React.Component {

    render(){
      let output="";
      if (this.props.loading===false){
        output=<div><div id='playBackTitle'>{HTMLReactParser(this.props.trackTitle)}</div>
        <div id='playBackAuthor'>{HTMLReactParser(this.props.trackAuthor)}</div>
        <DurationTimer /></div>
      } else {
        output=<div><div id='playBackTitle'>Loading...</div><div id='playBackAuthor'>&nbsp;</div></div>
      }
      return   <div id="playbackDisplay" className='empty'>
        {output}
      </div>

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(PlaybackDisplay);
