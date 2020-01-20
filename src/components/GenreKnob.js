import React, { Component } from 'react';
import { connect } from 'react-redux'
import {updateGenre, removeGenre} from '../actions/audioPlayback.js'
import {getGenres , setGenreScroll } from '../actions/genres'
import SimpleKnob  from './UI/SimpleKnob'

const mapStateToProps = (store) => {
  return {
    loading: store.tracks.loading,
    genreList: store.genres.genreList,
    source: store.tracks.source,
    genreScroll: store.genres.scroll,
    activeGenres: store.audioPlayback.genre
  }
}

//function passed to Reduxes Connect to dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    updateGenre: (genre) => dispatch(updateGenre(genre)),
    getGenres: () => dispatch(getGenres()),
    setGenreScroll: (rotation) => dispatch(setGenreScroll(rotation)),
    removeGenre: (genreIndex) => dispatch(removeGenre(genreIndex))
  }
}


class GenreKnob extends Component {

    scrollGenres=function(value){
      const scrollAreaContent=document.querySelector("#genresSelector .scrollarea-content");
      let scrollAreaContentHeight=scrollAreaContent.clientHeight;
      let scrollAreaHeight=document.querySelector("#genresSelector .scrollarea").clientHeight;
      let steps=parseInt(scrollAreaContentHeight/scrollAreaHeight);
      let position=(value/100)*(scrollAreaContentHeight-scrollAreaHeight)*(-1);
      let steppedPosition=Math.round(position/steps)*steps;
      scrollAreaContent.style.marginTop=steppedPosition+"px";
    }

    adjustKnob=function(rotation){
      this.props.setGenreScroll(rotation);
    }

    onScrollHandler=function(value){
      if(value.topPosition && value.containerHeight){
        let scrollPercentage=Number((value.topPosition/value.containerHeight).toFixed(2));
        let rotation=scrollPercentage*270;
        this.props.setGenreScroll(rotation);
      }
    }

    render(){

      return(
        <SimpleKnob label='Genres' id='genreKnob' min={0} max={100} rotation={this.props.genreScroll} adjustKnob={this.adjustKnob.bind(this)} action={this.scrollGenres.bind(this)} />
    );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(GenreKnob)
