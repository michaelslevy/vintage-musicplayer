import React, { Component } from 'react';
import TrackHolder from "./components/TrackList/TrackHolder";
import PlayControls from "./components/PlayControls"
import PlaybackDisplay from "./components/playbackDisplay"
import VuMeter from "./components/VuMeter"
import VolumeSliders from "./components/VolumeSliders"
import Genres from "./components/Genres"
//import SourceNav from "./components/SourceNav"
//import GenreKnob from "./components/GenreKnob"
import GenreButtons from "./components/GenreButtons"
import TrackScroller from "./components/TrackList/TrackScroller"

import Media from 'react-media';

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
             <Media query={{ minWidth:600 }}>
              <Genres />
             </Media>

            </div>
            <div id='right'>
              <PlaybackDisplay />
              <Media query={{ maxWidth:599 }}>
                <TrackScroller />
              </Media>
              <TrackHolder />
              <Media query={{ maxWidth:599 }}>
                <div id='genresSelector' className="genres mobile">
                  <GenreButtons />
                </div>
              </Media>
              <PlayControls />
            </div>
          </div>
      </div>
    );
  }
}

export default App;
