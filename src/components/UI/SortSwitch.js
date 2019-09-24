import React, { Component } from 'react';

import { connect } from 'react-redux'
import {sortTracksBy} from '../../actions/tracks'

import switchDown from "../../img/switch.down.png"
import switchUp from "../../img/switch.up.png"

const mapStateToProps = (store) => {
  return {
    trackList: store.tracks.trackList,
  }
}

//function passed to Reduxes Connect to dispatch to props
const mapDispatchToProps = (dispatch) => {
  return {
    sortTracksBy: (sortBy, list) => dispatch(sortTracksBy(sortBy, list)),
  }
}

class SortSwitch extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sort:"title"
    }
    this.sortHandler = this.sortHandler.bind(this);
  }

  sortHandler(){
    let sort=(this.state.sort==="author")?"title":"author";
    this.setState({sort});
    this.props.sortTracksBy(sort, this.props.trackList);
  }

  render() {

    return <div id='sortSwitcher'>
    <label>title</label>
    <button onClick={this.sortHandler}><img alt='Sort Toggle' src={(this.state.sort==="author")? switchDown: switchUp}  draggable="false" /></button>
    <label>artist</label>
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortSwitch)
