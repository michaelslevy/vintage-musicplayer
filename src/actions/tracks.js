import {parsePlaylist} from "../data/data.js";
import axios from 'axios';
const trackJSON="https://www.metrosonic.net/metrosonic_track/?JSON=1";

const requestTracks = users => ({
  type: 'tracks_REQUESTED'
});

const requestTracksSuccess = trackList => ({
  type: 'tracks_SUCCESS',
  trackList
});

const requestTracksFailure = err => ({
  type: 'tracks_FAILURE',
  err
});

export const setSource = source => ({
  type: 'trackSource_SET',
  source
});

export const setTrackScroll = scroll => ({
  type: 'trackScroll_SET',
  scroll
});

export const selectedTrackIndexSet=selectedTrackIndex=>({
  type:"selectedTrackIndex_SET",
  selectedTrackIndex
})

const sortTracks=function(sortBy,list){
  switch (sortBy){
    case "author":
      list.sort((a, b) => (a.author > b.author) ? 1 : -1)
    break;
    //case "title":
    default:
      list.sort((a, b) => (a.title > b.title) ? 1 : -1)
    break;
  }
  return list;
}

export const sortTracksBy=function(sortBy,list){
  let sortedList=sortTracks(sortBy,list);
  return function(dispatch) {
    dispatch(requestTracksSuccess([...sortedList]));
  }
}

//depending on source parameter load content
export const getTracks = (source) => {
  switch (source){
    case "soundcloud":
    const playlist="https://api.soundcloud.com/playlists/776621136?client_id=17a992358db64d99e492326797fff3e8";
      return (dispatch) => {
        fetch(playlist)
        .then(function(response) {
          return response.json();
        })
        .then(json => {
          let parsedList=sortTracks("title", parsePlaylist(json) );
          dispatch(requestTracksSuccess(parsedList));
        });
      }
    //case "local":
    default:
    return function(dispatch) {
        dispatch(requestTracks());
        return axios({
              url: trackJSON,
              timeout: 20000,
              method: 'get',
              responseType: 'json'
            })
              .then(function(response) {
                let sortedList=sortTracks("title", response.data );
                dispatch(requestTracksSuccess(sortedList));
              })
              .catch(function(response){
                alert(response);
                dispatch(requestTracksFailure(response.data));
          });
       }
  }

}
