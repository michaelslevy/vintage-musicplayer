import React from 'react';
import { connect } from 'react-redux'
import AudioPlayback from '../helpers/AudioPlayback'
import { updatePlaying, updateTitle, updateAuthor, updateTrackUrl, playAudio  }  from '../actions/audioPlayback.js'
import { selectedTrackIndexSet }  from '../actions/tracks.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faPause, faStop,faFastBackward,faFastForward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faPlay, faStop,faPause, faFastBackward,faFastForward);

const mapStateToProps = (store) => {
  return {
    trackURL: store.audioPlayback.trackURL,
    selectedTrackIndex: store.tracks.selectedTrackIndex,
    playing:store.audioPlayback.playing,
    volume: store.audioPlayback.volume
  }
}

//function passed to Reduxes Connect to dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    updatePlaying: (playing)=>dispatch(updatePlaying(playing)),
    selectedTrackIndexSet: (index)=>dispatch(selectedTrackIndexSet(index)),
    updateTitle:(title)=>dispatch(updateTitle(title)),
    updateAuthor:(author)=>dispatch(updateAuthor(author)),
    updateTrackUrl:(path)=>dispatch(updateTrackUrl(path)),
    playAudio:(path,volume)=>dispatch(playAudio(path,volume))
  }
}

class PlayControls extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        path: '',
        delayTimer:null
      };
    }

    hilightActive=(e, id)=>{
      let buttons=document.querySelectorAll("#playerControls button");
      for(let i=0; i<buttons.length; i++){
        buttons[i].classList.remove('active');
      }

      document.getElementById(id).classList.add('active');
    }

    stopAudioPlayback=(e, id)=>{
      e.preventDefault();
      e.stopPropagation();

      if(this.props.playing && this.props.trackURL){
        this.hilightActive(e, id);
        AudioPlayback.stop();
        this.props.updatePlaying("stopped");
      }

    }

    startAudioPlayback=(e, id)=>{
      e.preventDefault();
      e.stopPropagation();


      if(this.props.playing==="paused" || this.props.trackURL){
        this.hilightActive(e, id);
      }

      if(this.props.playing==="paused"){
        AudioPlayback.unPause();
        this.props.updatePlaying("playing");
      } else {
        if(this.props.trackURL){
            this.props.playAudio(this.props.trackURL,this.props.volume);
        }
      }

    }

    pauseAudioPlayback=(e, id)=>{
      e.preventDefault();
      e.stopPropagation();

      this.hilightActive(e, id)

      if(this.props.playing==="playing"){
        AudioPlayback.pause();
        this.props.updatePlaying("paused");
      } else if(this.props.playing==="paused"){
       AudioPlayback.unPause();
       this.props.updatePlaying("playing");
      }

    }

    getTrackData(track){
      let title=track.querySelector(".trackTitle").innerHTML;
      let author=track.querySelector(".trackAuthor").innerHTML;
      let path='';//track.querySelector(".playArrow").href;
      let data={title,author,path};
      return data;
    }

    updateTrackStore(data){
      this.props.updateTitle(data.title);
      this.props.updateAuthor(data.author);
      this.props.updateTrackUrl(data.path);
    }

    initiatePlayTrack=function(){
      AudioPlayback.stop();
      this.props.playAudio(this.props.trackURL,this.props.volume);
    }

    advanceAudioPlayback=(e)=>{
       e.preventDefault();
       e.stopPropagation();
       if(this.props.trackURL && this.props.playing==="playing"){
         AudioPlayback.advance();
       }
     }

    reverseAudioPlayback=(e)=>{
       e.preventDefault();
       e.stopPropagation();

       if(this.props.trackURL && this.props.playing==="playing"){
         AudioPlayback.reverse();
       }
     }

    resetSpeedAudioPlayback=(e)=>{
      e.preventDefault();
      e.stopPropagation();
    }

    render(){

      return   <div id='playerControls'>
          <button id='playButton' onClick={(e)=>this.startAudioPlayback(e,'playButton')}><span><FontAwesomeIcon icon="play" /></span></button>
          <button id='backButton' onClick={(e)=>this.reverseAudioPlayback(e,'backButton')}><mark></mark></button>
          <button id='forwardButton' onClick={(e)=>this.advanceAudioPlayback(e,'forwardButton')}><mark></mark></button>
          <button id='pauseButton' onClick={(e)=>this.pauseAudioPlayback(e,'pauseButton')} ><FontAwesomeIcon icon="pause" /></button>
          <button id='stopButton' onClick={(e)=>this.stopAudioPlayback(e,'stopButton')} ><FontAwesomeIcon icon="stop" /></button>
        </div>

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(PlayControls);
