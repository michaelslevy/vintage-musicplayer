import React from 'react';
import { connect } from 'react-redux'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import AudioPlayback from '../helpers/AudioPlayback'
import { updateVolume }  from '../actions/audioPlayback.js'


const mapStateToProps = (store) => {
  return {
    volume:store.audioPlayback.volume
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      updateVolume: (volume) => dispatch(updateVolume(volume)),
  }
}


class VolumeSliders extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      master: 100    }
  }

  handleChangeMaster = master => {
    this.setState({
      master: master
    })

    let decimal=master/100;

    let volumeSet=this.props.volume;
    volumeSet[0]=decimal;
    this.props.updateVolume(volumeSet);

    if(AudioPlayback.leftGainNode){
          AudioPlayback.masterGainNode.gain.setValueAtTime(decimal, AudioPlayback.context.currentTime);
    }

  };

render() {
    const master = this.state.master;

    return <div id='volumeSiders'>

       <div className='slider'>
          <div className='sliderBg'>
            <div className='screw'></div>
            <div className='scale'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              <span></span>
            </div>
               <Slider
                 min={0}
                 max={100}
                 orientation='vertical'
                 tooltip={false}
                 value={master}
                 onChange={this.handleChangeMaster}
               />
               <div className='screw'></div>
            </div>
             <div className='value'>{master}%</div>
             Volume
        </div>

    </div>
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(VolumeSliders);
