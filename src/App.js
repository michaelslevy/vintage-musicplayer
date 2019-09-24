import React, { Component } from 'react';
import TrackHolder from "./components/TrackList/TrackHolder";
import PlayControls from "./components/PlayControls"
import PlaybackDisplay from "./components/playbackDisplay"
import VuMeter from "./components/VuMeter"
import VolumeSliders from "./components/VolumeSliders"
import Genres from "./components/Genres"
//import Logo from "./logo.png"

class App extends Component {

  render() {
    return (
      <div className="App" id='metrosonicPlayer'>
          <header>
            <h1 id='logo'><span>Metrosonic</span></h1>

          {/* <SourceKnob />*/ }
          </header>
          <div id='wrapper'>
            <div id='left'>
              <div id='topRow'>
                <VuMeter />
              </div>
             <VolumeSliders />
             <Genres />
            </div>
            <div id='right'>
              <PlaybackDisplay />
              <TrackHolder />
              <PlayControls />
            </div>
          </div>
      </div>
    );
  }
}

export default App;
