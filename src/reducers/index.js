import { combineReducers } from 'redux'
import tracks from './tracks';
import genres from './genres';
import audioPlayback from './audioPlayback';

export default combineReducers({ genres,tracks,audioPlayback });
