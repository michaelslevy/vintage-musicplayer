const initialState = {
  loading: false,
  playing: false,
  trackURL:'',
  title:'Select Track',
  author:'888888888888888',
  volume:[1,1],
  genre:[]
}

const audioPlayback = (state = initialState, action) => {

  switch (action.type) {

    case "UPDATE_TRACK_URL":
      return {
        ...state,
        trackURL:action.url
      }

    case "UPDATE_TITLE":
      return {
        ...state,
        title:action.title
      }

    case "UPDATE_AUTHOR":
      return {
        ...state,
        author:action.author
      }

    case "UPDATE_PLAYING":
      return {
        ...state,
        playing:action.playing
    }

    case "UPDATE_VOLUME":
      return {
        ...state,
        volume:action.volume
    }

    case "UPDATE_GENRE":
      return {
        ...state,
        genre:[...state.genre,action.genre]
    }

    case "REMOVE_GENRE":
      return {
        ...state,
        genre:[
              ...state.genre.slice(0, action.genreIndex),
              ...state.genre.slice(action.genreIndex + 1)
              ]
      }

      case "RESET_GENRE":
        return {
          ...state,
          genre:[]
      }

    case "UPDATE_LOADING":
      return {
        ...state,
        loading:action.loading
    }


    default:
      return state
  }
}

export default audioPlayback;
