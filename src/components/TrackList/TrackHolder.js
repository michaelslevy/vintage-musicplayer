import React, { Component } from 'react';
import {fetchSoundcloudPlaylist} from "../../data/data.js";
import Track from "./Track";

import { connect } from 'react-redux'
import {getTracks, setTrackScroll}  from '../../actions/tracks'

import ScrollArea from 'react-scrollbar'

//function passed to Reduxes Connect to populate store
const mapStateToProps = (store) => {
  return {
    loading: store.tracks.loading,
    trackList: store.tracks.trackList,
    source: store.tracks.source,
    genre: store.audioPlayback.genre
  }
}

//function passed to Reduxes Connect to dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    getTracks: (source) => dispatch(getTracks(source)),
    fetchSoundcloudPlaylist:()=>dispatch(fetchSoundcloudPlaylist()),
    setTrackScroll:(scrollPercentage)=>dispatch(setTrackScroll(scrollPercentage))
  }
}

class TrackHolder extends Component {

  componentDidMount() {
      this.props.getTracks("local");
  }

  onScrollHandler=function(value){
    if(value.topPosition && value.containerHeight){
      let scrollPercentage=Number((value.topPosition/value.containerHeight).toFixed(2));
      let rotation=scrollPercentage*270;
      this.props.setTrackScroll(rotation);
    }
  }

    render(){
      return(
      <div className='trackHolder' id='trackHolder'>
        <div id='trackLabels'><div id='songLabel' className='trackLabel'>Song Title</div><div id='artistLabel' className='trackLabel'>Artist</div></div>
        <ScrollArea
              speed={0.8}
              className="tracks"
              contentClassName="content"
              horizontal={false}
              vertical={true}
              onScroll={(value) => {this.onScrollHandler(value)}}
              >
          {
            (this.props.genre.length===0)?
              this.props.trackList.map((track, index) =>
              <Track key={"trackDisplay"+index} index={index} track={this.props.trackList[index]} />
            ): this.props.trackList.filter(track=>this.props.genre.includes(track.genre)).map((track, index) =>
            <Track key={"trackDisplay"+index} index={index} track={track} />
          )
          }
        </ScrollArea>
      </div>
    );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(TrackHolder)
