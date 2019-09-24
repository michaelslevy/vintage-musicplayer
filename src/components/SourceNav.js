import React from 'react';
import { connect } from 'react-redux'

import {setSource, getTracks} from '../actions/tracks'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faMusic,faBroadcastTower } from '@fortawesome/free-solid-svg-icons'

import toggleDown from "../img/toggleDown.png"
import toggleUp from "../img/toggleUp.png"
import {resetGenre} from '../actions/audioPlayback.js'


library.add(faMusic,faBroadcastTower);

const mapDispatchToProps = (dispatch) => {
  return {
    setSource:(source) => dispatch(setSource(source)),
    getTracks: (source) => dispatch(getTracks(source)),
    resetGenre: () => dispatch(resetGenre())
  }
}

class SourceNav extends React.Component {

    constructor(){
      super();
      this.state={
        source:"local"
      }
      this.sortHandler = this.sortHandler.bind(this);
    }

    sortHandler(){
      let source=(this.state.source==="soundcloud")?"local":"soundcloud";
      this.setState({source});
      if(source==="soundcloud"){
        this.props.resetGenre();
        let pushButtons=document.querySelectorAll(".pushButton button");
        for (let x=0; x<pushButtons.length; x++){
          pushButtons[x].classList.remove('active');
        }
      }
      this.props.setSource(source);
      this.props.getTracks(source);
    }

    setTrackSource=function(source, e){
      document.getElementById("local").classList.remove('active');
      document.getElementById("soundcloud").classList.remove('active');
      document.getElementById(source).classList.add('active');

      this.props.setSource(source);
      this.props.getTracks(source);
    }

    render(){

      return  <nav id='sourceSelector'>
      <div className='groupTitle'>SOUND SOURCE</div>
      <label>Metrosonic<br/> Library</label>
        <div id='sourceButtonGroup'>
          <div className={(this.state.source==="local")? "led top active": "led top"}></div>
          <button onClick={this.sortHandler}><img alt='source selector' height='80' src={(this.state.source==="soundcloud")? toggleDown: toggleUp}  draggable="false" /></button>
          <div className={(this.state.source==="soundcloud")? "led bottom active": "led bottom"}></div>
        </div>
      <label>SoundCloud</label>
      </nav>

    }


}

export default connect(null,mapDispatchToProps)(SourceNav);
