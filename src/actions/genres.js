import axios from 'axios';
//const trackJSON="https://www.metrosonic.net/metrosonic_track/?JSON=1&GENRE=1";
const trackJSON="http://wordpressdemo.webventions.com/track/?JSON=1&GENRE=1";

const requestGenre = users => ({
  type: 'genre_REQUESTED'
});

const requestGenreSuccess = genreList => ({
  type: 'genre_SUCCESS',
  genreList
});

const requestGenreFailure = err => ({
  type: 'genre_FAILURE',
  err
});

export const setGenreScroll = scroll => ({
  type: 'genre_scroll',
  scroll
});

export const getGenres = () => {
    return function(dispatch) {
		    dispatch(requestGenre());
        return axios({
              url: trackJSON,
              timeout: 20000,
              method: 'get',
              responseType: 'json'
            })
              .then(function(response) {
                dispatch(requestGenreSuccess(response.data));
              })
              .catch(function(response){
                dispatch(requestGenreFailure(response.data));
          });
       }
  }
