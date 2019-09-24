import React from 'react';
import AudioPlayback from '../helpers/AudioPlayback';
import SimpleKnob from './UI/SimpleKnob';

class Reverb extends React.Component {

  setReverb_Dry=function(val){
    let decimal=val/100;
    AudioPlayback.reverb.dry.value=decimal;
  }

  setReverb_Wet=function(val){
    let decimal=val/100;
    AudioPlayback.reverb.wet.value=decimal;
  }


  render(){
    return <div id='reverbGroup'>
      <h4>Reverb</h4>
      <SimpleKnob id='ReverbWet' min={0} max={600} action={this.setReverb_Wet} label='Wet'/>
      <SimpleKnob id='ReverbDry' min={0} max={600} action={this.setReverb_Dry} label='Dry'/>
    </div>
  }
}

export default Reverb;
