const initialState = {
  loading: true,
  source:"local",
  sort: "author",
  trackList: [],
  selectedTrackIndex:0,
  scroll:0
}

const tracks = (state = initialState, action) => {
  switch (action.type) {
    /*tracks*/
    case "tracks_REQUESTED":
       return {
         ...state,
         loading: true,
         error:false,
         trackList:[]
       }

     case "tracks_SUCCESS":
       return {
         ...state,
         loading: false,
         trackList: action.trackList,
         error:false
       }

     case "tracks_FAILURE":
       return {
         ...state,
         loading: false,
         trackList:[],
         error: action.error
       }

       case "trackSource_SET":
         return {
           ...state,
           loading: false,
           source:action.source,
           error: action.error
         }

         case "selectedTrackIndex_SET":
          return {
            ...state,
            selectedTrackIndex:action.selectedTrackIndex
          }

          case "trackScroll_SET":
           return {
             ...state,
             scroll:action.scroll
           }

     default:
       return state
   }
 }

 export default tracks;
