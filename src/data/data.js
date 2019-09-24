const categories=[
  "All",
  "Rock",
  "Jazz",
  "Hip-Hop",
  "World",
  "R&B",
  "Metal",
  "Indie"
];

const playlist="http://api.soundcloud.com/playlists/776621136?client_id=17a992358db64d99e492326797fff3e8";

export function parsePlaylist(json){
  let soundcloudTracks=[];
  let tracks=json.tracks;
  if(tracks){
    for(let i=0; i<tracks.length; i++){

      let track = {
        "path": tracks[i].stream_url+"?client_id=17a992358db64d99e492326797fff3e8",
        "title": tracks[i].title,
        "author": tracks[i].user.username
      }
      soundcloudTracks.push(track);
    }
  }

  return soundcloudTracks;
}

export function fetchSoundcloudPlaylist (){

  fetch(playlist)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    return parsePlaylist(myJson);
  });
}


export function _getTracks () {
  return new Promise((res, rej) => {
    ///setTimeout(() => res([...tracks]), 1)
  })
}

export function _getCategories () {
  return categories;
}
