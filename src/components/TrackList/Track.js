import React from 'react';
import { connect } from 'react-redux'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

import HTMLReactParser from "html-react-parser"

import { updateTitle, updateAuthor, updatePlaying, updateTrackUrl, playAudio }  from '../../actions/audioPlayback.js'
import {selectedTrackIndexSet} from '../../actions/tracks.js'
//import {generateSoundObjects} from '../../helpers/generateSoundObjects.js'

library.add(faPlayCircle);

//function passed to Reduxes Connect to populate store
const mapStateToProps = (store) => {
  return {
    trackURL: store.audioPlayback.trackURL,
    volume: store.audioPlayback.volume
  }
}

//function passed to Reduxes Connect to dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
      updateTitle: (title) => dispatch(updateTitle(title)),
      updateAuthor: (author)=>dispatch(updateAuthor(author)),
      updatePlaying: (playing)=>dispatch(updatePlaying(playing)),
      updateTrackUrl:(url)=>dispatch(updateTrackUrl(url)),
      selectedTrackIndexSet:(index)=>dispatch(selectedTrackIndexSet(index)),
      playAudio:(path,volume)=>dispatch(playAudio(path,volume))
  }
}


class Track extends React.Component {

  updateSound=(e)=>{
    e.preventDefault();
    e.stopPropagation();

    this.props.selectedTrackIndexSet(this.props.index);
    this.props.updateTitle(this.props.track.title);
    this.props.updateAuthor(this.props.track.author);
    this.props.updateTrackUrl(this.props.track.path);
  }

  render() {
    return <div className='track'>
      <div className='trackTitle data' ><a href={this.props.track.path} onClick={(e)=>this.updateSound(e)}>
        {HTMLReactParser(this.props.track.title)}</a>
      </div>
      <div className='trackAuthor data'><a href={this.props.track.path} onClick={(e)=>this.updateSound(e)}>
        {HTMLReactParser(this.props.track.author)}</a>
      </div>
    </div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Track);
