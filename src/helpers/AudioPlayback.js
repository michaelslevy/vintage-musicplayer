import { AudioContext } from 'standardized-audio-context';

class _AudioPlayback {

  constructor() {
    this.context=false;
    this.source=false;
    this.splitter = false;
    this.analyserLeft = false;
    this.analyserRight = false;
    this.analyserMono = false;
    this.playing=false;
    this.pausedAt = 0;
    this.startedAt = 0;
    this.fadeNode = false;
    this.path='';
    this.masterGainNode=false;
    this.reverb=false;
    this.buffers=false;
    this.merger=false;

  }

  startAudioContext=function(){
    this.context = new AudioContext();


    if (!this.context) {
      console.error('No AudioContext found in this environment. Please ensure your window or global object contains a working AudioContext constructor function.');
      return;
    }

    //this.context = new AudioContext();

    this.fadeNode = this.context.createGain();

  }

  loadTrack=function(path){
    console.log("Loading track ----->");
    if(!this.context){this.startAudioContext();}
    const $this=this;
    let pausedAt=$this.pausedAt;
    this.path=path;
    this.buffers=false;
        return Promise.all([
              fetch(path)
          ]).then(
              responses => Promise.all(responses.map(r => r.arrayBuffer())),
          ).then(
              buffers => Promise.all(buffers.map(b => $this.context.decodeAudioData(b))),
          ).then(audioBuffers => {
              this.buffers = audioBuffers;
              this.setUpNodes();
              this.play(pausedAt);
        });
    }

  setUpNodes=function(){
    this.stop();

    this.source = this.context.createBufferSource();
    this.context.createBufferSource();
		this.source.buffer = this.buffers[0];
    this.merger=this.context.createChannelMerger(2);

    /* Add Stereo Splitter*/
    this.splitter = this.context.createChannelSplitter(2);
    this.source.connect(this.splitter);

    /*Add Gain node*/

    this.masterGainNode = this.context.createGain();
    this.masterGainNode.gain.value = 1; // setting it to 10%
    this.masterGainNode.connect(this.context.destination);

    this.leftGainNode = this.context.createGain();
    this.leftGainNode.gain.value = 1; // setting it to 10%
    this.leftGainNode.connect(this.context.destination);
    this.splitter.connect(this.masterGainNode, 0);
    this.splitter.connect(this.masterGainNode, 1);

    /* Create Analysers */
    this.analyserLeft = this.context.createAnalyser();
    this.analyserRight = this.context.createAnalyser();
    this.analyserMono = this.context.createAnalyser();
    this.splitter.connect(this.analyserLeft, 0);

    /* Connect analyzers */
    this.masterGainNode.connect(this.analyserMono, 0);
    this.splitter.connect(this.analyserLeft, 0);
    this.splitter.connect(this.analyserRight, 1)

    this.merger.connect(this.context.destination);
	//	this.source.connect(this.context.destination);
  }

  play=function(pausedAt){
    this.playing="playing";
    let offset = pausedAt;

    this.source.start(0, offset);
    this.startedAt = this.context.currentTime - offset;
  }

  stop=function(){
    this.playing="stopped";
    this.pausedAt = 0;
    this.startedAt = 0;
		this.stopWithRelease();
  }

  getElapsedTime=function(){
    return this.context.currentTime - this.startedAt;
  }

  pause=function(){
    this.playing="paused";

    //this.pausedAt = this.getElapsedTime();
    this.context.suspend();
		//this.stopWithRelease();
  }

setupAnalyzers=function(){

  /* Create Analysers */
  this.analyserLeft = this.context.createAnalyser();
  this.analyserRight = this.context.createAnalyser();
  this.analyserMono = this.context.createAnalyser();
  this.splitter.connect(this.analyserLeft, 0);

  /* Connect analyzers */
  this.masterGainNode.connect(this.analyserMono, 0);
  this.splitter.connect(this.analyserLeft, 0);
  this.splitter.connect(this.analyserRight, 1)

  this.merger.connect(this.context.destination);
}
  unPause=function(){
    this.playing="playing";

    this.context.resume().then(this.setupAnalyzers());
  }

  /* reference line:599:
  https://github.com/alemangui/pizzicato/blob/master/src/Sound.js
  */
  stopWithRelease=function(){
    const node = this.source;

    const stopSound = function() {
      if(node.disconnect){
        node.disconnect();
      }
      if(node.stop){
        node.stop(0);
      }
      return false;
		};

		this.fadeNode.gain.cancelScheduledValues(this.context.currentTime);

		if (!this.release) {
			this.fadeNode.gain.setTargetAtTime(0.0, this.context.currentTime, 0.001);
		  stopSound();
			return;
		}

		// We can't calculate the remaining attack time
		// in Firefox due to https://bugzilla.mozilla.org/show_bug.cgi?id=893020
		const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
		let remainingReleaseTime = this.release;

		if (!isFirefox)
			remainingReleaseTime = this.fadeNode.gain.value * this.release;

		this.fadeNode.gain.setTargetAtTime(0.00001, this.context.currentTime, remainingReleaseTime / 5);

		window.setTimeout(function() {
			stopSound();
		}, remainingReleaseTime * 1000);
	}

  reverse(){
    this.pausedAt=this.context.currentTime-10-this.startedAt;
    if(this.pausedAt<0){this.pausedAt=0;}
    if(this.path){
      this.source.stop();
      this.loadTrack(this.path);
    }
  }

  advance(){
    this.pausedAt=this.context.currentTime+10-this.startedAt;
    if(this.pausedAt<0){this.pausedAt=0;}
    if(this.path){
      this.source.stop();
      this.loadTrack(this.path);
    }
  }

}

const AudioPlayback = new _AudioPlayback();

export default AudioPlayback;
