import React from 'react';
import { connect } from 'react-redux'
import Meter from "./UI/Meter";
import AudioPlayback from '../helpers/AudioPlayback'
import Media from 'react-media';

const mapStateToProps = (store) => {
  return {
    analyserLeft:store.audioPlayback.analyserLeft,
    analyserRight:store.audioPlayback.analyserRight,
    analyserMono:store.audioPlayback.analyserMono,
    playing: store.audioPlayback.playing,
    volume:store.audioPlayback.volume
  }
}

class VuMeter extends React.Component {

    meterInterval=0;

    checkVolume=function(analyser, meter, volumeAdjuster){

        let frequencyData = new Uint8Array(1);
        analyser.getByteFrequencyData(frequencyData);
        let volume=frequencyData[0];

        //min=20deg   max=160deg
        //.54 is conversion ration + minimum angle
        //volumeAdjuster is set in components/VolumeSliders
        let rotation=(parseInt(volume*.54*volumeAdjuster))+20;
        let meterElem=document.getElementById(meter);
        let needles=(meterElem)? meterElem.getElementsByClassName('needle'):false;
        if(needles===false){return false;}
        let needle=needles[0];

        needle.style.transform="rotate("+rotation+"deg)";

        return [meter, rotation];
    }

    startChecker=function(){

      const $this=this;

      this.meterInterval=setInterval(function(){
        if(document.getElementById("meterMono")){
          if(AudioPlayback.analyserLeft){
            $this.checkVolume(AudioPlayback.analyserLeft,"meterMono",$this.props.volume[0]);
          }

        } else {
          if(AudioPlayback.analyserLeft && AudioPlayback.analyserRight){
              $this.checkVolume(AudioPlayback.analyserLeft,"meterLeft",$this.props.volume[0]);
              $this.checkVolume(AudioPlayback.analyserRight, "meterRight",$this.props.volume[0]);
          }
        }

      }, 50);
    }

    componentDidUpdate(prevProps, prevState, snapshot){

          clearInterval(this.meterInterval);
          this.startChecker();

    }

    render(){

      return  <div id='meters'>
      <Media query={{ minWidth: 950 }}>
         {matches =>
           matches ? (
             <div className='inner'>
              <Meter meterID='meterLeft' label='Left' />
              <Meter meterID='meterRight' label='Right' />
             </div>
           ) : (
             <Meter meterID='meterMono' label='Volume' />
           )
         }
       </Media>

      </div>

    }

}

export default connect(mapStateToProps)(VuMeter);
