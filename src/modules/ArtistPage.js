import axios from "axios";
export default {
  namespaced: true,
  state: {
    artist_followers: [],
    artist_tracks: [],
    tracks_length: "",
    artist_albums: [],
    loadedchart: false,
    artist_relatedartists: [],
    bio: "",
    artist_name: "",
    artistcover_image: "",
    userID: "",
    followartist: false,
    loading: false
  },
  mutations: {
    set_artist_followers(state, followers) {
      state.artist_followers = followers;
    },
    set_loadedchart(state, loaded) {
      state.loadedchart = loaded;
    },
    set_artist_tracks(state, tracks) {
      state.artist_tracks = tracks;
    },
    set_tracks_length(state, length) {
      state.tracks_length = length;
    },
    set_artist_relatedartists(state, artists) {
      artists.forEach(artist => {
        if (artist.images.length == 0)
          artist.images.push({ _id: "5eb52f1863eea332d416b9fa" });
      });
      state.artist_relatedartists = artists;
    },
    set_artist_albums(state, albums) {
      albums.forEach(album => {
        if (album.images.length == 0)
          album.images.push({ _id: "5eb52f1863eea332d416b9fa" });
      });
      state.artist_albums = albums;
    },
    set_artist_name(state, name) {
      state.artist_name = name;
    },
    set_artistcover_image(state, image) {
      state.artistcover_image = image;
    },
    set_followartist(state, like) {
      state.followartist = like;
    },
    set_bio(state, bio) {
      state.bio = bio;
    },
    set_artist_ID(state, id) {
      state.userID = id;
    }
  },
  actions: {
    artist_page({ commit }, artist_id) {
      axios
        .get("api/Artists/" + artist_id)
        .then(response => {
          let artist = response.data;
          commit("set_artist_name", artist.Name);
          commit("set_artistcover_image", artist.images[0]);
          commit("set_bio", artist.info);
          commit("set_artist_ID", artist.userId);
        })
        .catch(error => {
          console.log(error);
        });
    },

    artist_tracks({ commit }, artist_id) {
      axios
        .get("api/Artists/" + artist_id + "/top-tracks?country=eg")
        .then(response => {
          let artist = response.data;
          this.artist_tracks = [];
          var limitedtracks = [];
          if (artist.length >= 5) {
            for (let i = 0; i < 5; i++) {
              limitedtracks.push(artist[i]);
            }
            commit("set_artist_tracks", limitedtracks);
            commit("set_tracks_length", 5);
          } else {
            commit("set_artist_tracks", artist);
            commit("set_tracks_length", artist.length);
          }
        })
        .catch(error => {
          console.log(error);
          commit("set_artist_tracks", []);
        });
    },

    artist_albums({ commit }, artist_id) {
      axios
        .get("api/Artists/" + artist_id + "/Albums")
        .then(response => {
          let albums = response.data;
          commit("set_artist_albums", albums);
        })
        .catch(error => {
          console.log(error);
        });
    },

    artist_relatedartists({ commit }, artist_id) {
      axios
        .get("api/Artists/" + artist_id + "/related_artists")
        .then(response => {
          let artists = response.data;
          commit("set_artist_relatedartists", artists);
        })
        .catch(error => {
          console.log(error);
        });
    },

    follow_artist({ commit }, artist_id) {
      axios
        .put("api/me/following", { id: artist_id })
        .then(response => {
          let artist = response.status;
          if (artist == 200) {
            commit("set_followartist", true);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    unfollow_artist({ commit }, artist_id) {
      axios
        .delete("api/me/following", { data: { id: artist_id } })
        .then(response => {
          let artist = response.status;
          if (artist == 200) {
            commit("set_followartist", false);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    checkisfollowed({ commit }, artist_id) {
      axios
        .get("api/me/following/contains/" + artist_id)
        .then(response => {
          let artist = response.data;
          if (artist.follow == true) {
            commit("set_followartist", true);
          } else {
            commit("set_followartist", false);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    async numberoffollowers({ commit }, artist_id) {
      await axios
        .get("api/Artists/numberOfFollowers/" + artist_id)
        .then(response => {
          let arrayofFollowers = response.data;
          commit("set_artist_followers", arrayofFollowers.numOfFollowers);
          commit("set_loadedchart", true);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  getters: {
    artist_name: state => state.artist_name,
    artistcover_image: state => state.artistcover_image,
    followartist: state => state.followartist,
    artist_tracks: state => state.artist_tracks,
    artist_albums: state => state.artist_albums,
    artist_bio: state => state.bio,
    artist_relatedartists: state => state.artist_relatedartists,
    tracks_length: state => state.tracks_length,
    loadedchart: state => state.loadedchart,
    artist_followers: state => state.artist_followers
  }
};
