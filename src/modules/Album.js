import axios from "axios";
export default {
  namespaced: true,
  state: {
    album_tracks: [],
    album_loaded: false,
    album_length: "",
    album_name: "",
    artist_name: "",
    album_image: "",
    artist_id: "",
    likedalbum: Boolean,
  },
  mutations: {
    set_album(state, album_tracks) {
      state.album_tracks = album_tracks;
    },
    set_album_loaded(state, status) {
      state.album_loaded = status;
    },
    set_album_length(state, length) {
      state.album_length = length;
    },
    set_album_name(state, name) {
      state.album_name = name;
    },
    set_artist_name(state, name) {
      state.artist_name = name;
    },
    set_album_image(state, image) {
      state.album_image = image;
    },
    set_likedalbum(state, like) {
      state.likedalbum = like;
    },
    set_artist_id(state, id) {
      state.artist_id = id;
    },
  },
  actions: {
    album_tracks({ commit }, album_id) {
      commit("set_album_loaded", false);
      axios
        .get("/api/albums/" + album_id)
        .then((response) => {
          let album = response.data;
          commit("set_album", album.track);
          commit("set_album_loaded", true);
          commit("set_album_length", response.data.track.length);
          commit("set_album_name", album.name);
          commit("set_artist_name", album.artistName);
          commit("set_artist_id", album.artistId);
          if (typeof album.images[0] == "undefined")
            commit("set_album_image", "5eb52f1863eea332d416b9fa");
          else commit("set_album_image", album.images[0]._id);
          commit("set_likedalbum", album.isSaved);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    like_album({ commit }, album_id) {
      axios
        .put("/api/me/Albums", { ids: album_id })
        .then((response) => {
          let album = response.status;
          if (album == 200) {
            commit("set_likedalbum", true);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    unlike_album({ commit }, album_id) {
      axios
        .delete("/api/me/albums", { data: { ids: album_id } })
        .then((response) => {
          let album = response.status;
          if (album == 200) {
            commit("set_likedalbum", false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  getters: {
    album_tracks: (state) => state.album_tracks,
    album_loaded: (state) => state.album_loaded,
    album_length: (state) => state.album_length,
    album_name: (state) => state.album_name,
    artist_name: (state) => state.artist_name,
    album_image: (state) => state.album_image,
    likealbum: (state) => state.likedalbum,
    artist_id: (state) => state.artist_id,
  },
};
