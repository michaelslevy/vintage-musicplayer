import React, { Component } from 'react';
import SourceNav from "./SourceNav"
import GenreButtons from "./GenreButtons"
import GenreKnob from "./GenreKnob"
import TrackScroller from "./TrackList/TrackScroller"

class Genres extends Component {
    render(){

      return(
      <div className='genres' id='genresSelector'>

         <GenreButtons />
          <div id='rightColumn'>
            <div className='topRow'>
              <GenreKnob/>
              <SourceNav />
            </div>
            <TrackScroller />
          </div>
      </div>
    );
    }

}

export default Genres
