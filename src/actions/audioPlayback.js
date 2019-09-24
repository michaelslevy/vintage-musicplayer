import AudioPlayback from '../helpers/AudioPlayback'

export const updateTitle=(title)=>({
  type: 'UPDATE_TITLE',
  title
})

export const updateAuthor=(author)=>({
  type: 'UPDATE_AUTHOR',
  author
})

export const updateTrackUrl=(url)=>({
  type: 'UPDATE_TRACK_URL',
  url
})

export const updatePlaying=(playing)=>({
  type: 'UPDATE_PLAYING',
  playing
})

export const updateVolume=(volume)=>({
  type: 'UPDATE_VOLUME',
  volume
})

export const updateGenre=(genre)=>({
  type: 'UPDATE_GENRE',
  genre
})

export const removeGenre=(genreIndex)=>({
  type: 'REMOVE_GENRE',
  genreIndex
})

export const resetGenre=(genre)=>({
  type: 'RESET_GENRE',
  genre
})

export const updateLoading=(loading)=>({
  type: 'UPDATE_LOADING',
  loading
})

export const playAudio = (trackURL,volume) => {
  return (dispatch) => {
  dispatch(updateLoading(true));
   AudioPlayback.loadTrack(trackURL)
        .then(() => {
          AudioPlayback.masterGainNode.gain.setValueAtTime(volume[0], AudioPlayback.context.currentTime);
           dispatch(updatePlaying("playing"));
           dispatch(updateLoading(false));
        });
  };
};
