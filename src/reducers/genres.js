const initialState = {
  loading: true,
  error:false,
  genreList:[],
  scroll:0
}

const genres = (state = initialState, action) => {
  switch (action.type) {
         /*genre*/
         case "genre_REQUESTED":
            return {
              ...state,
              loading: true,
              error:false,
              genreList:[]
            }

          case "genre_SUCCESS":
            return {
              ...state,
              loading: false,
              genreList: action.genreList,
              error:false
            }

          case "genre_scroll":
            return {
              ...state,
              scroll: action.scroll,
            }

          case "genre_FAILURE":
            return {
              ...state,
              loading: false,
              genreList:[],
              error: action.error
            }

     default:
       return state
   }
 }

 export default genres;
