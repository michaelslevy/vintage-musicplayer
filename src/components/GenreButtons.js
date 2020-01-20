import React, { Component } from 'react';
import { connect } from 'react-redux'
import {updateGenre, removeGenre} from '../actions/audioPlayback.js'
import {getGenres , setGenreScroll } from '../actions/genres'
import ScrollArea from 'react-scrollbar'

import PushButton  from './UI/PushButton'

//getGenres()

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


class GenreButtons extends Component {

  componentDidMount() {
    this.props.getGenres();
  }

    switchGenre=function(genre){
      let selected=document.querySelector(".genres button[data-genre='"+genre+"']");
      if(selected.classList.contains("active")){
        selected.classList.remove('active');
        let genreIndex=this.props.activeGenres.indexOf(genre);
        this.props.removeGenre(genreIndex);
      } else {
        selected.classList.add('active');
        this.props.updateGenre(genre);
      }
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

      const genreButtons = this.props.genreList.map((genre, index) =>
        <PushButton
        key={genre+index}
        index={index}
        disabled={(this.props.source==="soundcloud")?"disabled":""}
        label={genre}
        handler={this.switchGenre.bind(this)} />
      );

      return(
         <ScrollArea
            speed={0.8}
            className="tracks"
            contentClassName="content"
            horizontal={false}
            vertical={true}
            onScroll={(value) => {this.onScrollHandler(value)}}
            >
            {genreButtons}</ScrollArea>
          );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(GenreButtons)
