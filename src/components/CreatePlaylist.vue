<template>
  <div>
    <transition name="fade" appear>
      <div
        class="modal-overlay"
        v-if="showModal"
        @click="showModal = false"
      ></div>
    </transition>
    <transition name="slide" appear>
      <div class="modal" v-if="showModal">
        <button class="cancel" @click="changeModalState()">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Close</title>
            <path
              d="M31.098 29.794L16.955 15.65 31.097 1.51 29.683.093 15.54 14.237 1.4.094-.016 1.508 14.126 15.65-.016 29.795l1.414 1.414L15.54 17.065l14.144 14.143"
              fill="#fff"
              fill-rule="evenodd"
            />
          </svg>
        </button>

        <h1 class="title">Create New Playlist</h1>

        <div class="child">
          <div class="grandchild">
            <h4 class="playlist_name">Playlist Name</h4>
            <input
              class="name_input"
              type="text"
              placeholder="New Playlist"
              v-model="playlistname"
              @keyup.enter="CreatePlaylist(), changeModalState()"
            />
          </div>
        </div>
        <div class="myrow">
          <div class="buttonWrapper">
            <button
              class="customButton cancel_button"
              @click="changeModalState()"
            >
              cancel
            </button>
          </div>
          <div class="buttonWrapper">
            <button
              class="customButton creat_button"
              testid="confirm_create"
              @click.prevent="CreatePlaylist()"
              @click="changeModalState()"
            >
              create
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
* {
  margin: 10;
  padding: 10;
  box-sizing: border-box;
  overflow: hidden;
}

body {
  font-family: "montserrat", sans-serif;
  overflow-y: hidden;
}

div {
  /* relative */
  position: relative;
  display: block;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.myrow {
  display: block;
  width: 100vw;
  height: 200px;
  position: fixed;
  top: 70%;
}
.customButton {
  position: absolute;
  appearance: none;
  outline: none;
  cursor: pointer;
  height: 10%;
  width: 30%;
  border-radius: 500px;
  border-color: transparent;
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  overflow-y: hidden;
  overflow-x: hidden;
  line-height: 18px;
  letter-spacing: 1.76px;
  text-transform: uppercase;
  white-space: nowrap;
  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  display: inline-block;
  text-align: center;
  z-index: 40;
  background: none;
}
.creat_button {
  border: none;
  background-color: #1ed760;
  transition: 0.4s ease-out;
  border: 2px solid transparent;
}
.cancel_button {
  border-color: #fff;
  transition: all 33ms cubic-bezier(0.3, 0, 0, 1);
  border: 2px solid;
  margin-left: 30%;
}
.buttonWrapper {
  width: 50%;
  height: 500px;
  display: inline-block;
  padding: 3% 10% 3% 10%;
}

.modal-overlay {
  /* fixed */
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: none;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0);
  overflow: hidden;
}

.modal {
  /* fixed */
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: table;
  transition: opacity 0.3s ease;
  overflow: hidden;
}
input {
  width: 100%;
  height: 10%;
  align-items: center;
  background-color: transparent;
  color: #fff;
  border-color: transparent;
  padding: 32px 0px;
  font-size: 48px;
  line-height: 50px;
  color: #fff;
  text-transform: none;
  outline: none;
  font-weight: bold;
  overflow-y: hidden;
  z-index: 60;
  overflow: hidden;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
  overflow: hidden;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  overflow: hidden;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(-50%) translateX(100vw);
  overflow: hidden;
}
.cancel {
  position: absolute;
  left: 50%;
  top: 20%;
  display: inline-block;
  background-color: transparent;
  color: #fff;
  border: none;
  overflow: hidden;
  z-index: 40;
}
.title {
  position: absolute;
  top: 25%;
  display: block;
  font-size: 48px;
  line-height: 56px;
  letter-spacing: -0.005em;
  color: #fff;
  text-transform: none;
  text-align: center;
  margin: 16px 0;
  width: 100%;
  overflow: hidden;
  z-index: 60;
}
.grandchild {
  position: fixed;
  align-items: center;
  width: 70%;
  height: 30%;
  left: 15%;
  padding: 32px 0px;
  overflow: hidden;
  z-index: 60;
}
.child {
  position: fixed;
  height: 30%;
  top: 40%;
  bottom: 50%;
  background-color: #424242;
  overflow: hidden;
  z-index: 60;
}
.playlist_name {
  color: #fff;
  overflow: hidden;
  z-index: 60;
}
.column {
  position: absolute;
  top: 70%;
  max-width: 160px;
  max-height: 50px;
  z-index: 40;
}
@media screen and (max-width: 700px) {
  .customButton {
    height: 10%;
    width: 43%;
    border-radius: 500px;
    font-size: 10px;
  }
  .cancel_button {
    margin-left: 43%;
  }
  .buttonWrapper {
    width: 50%;
    height: 500px;
    display: inline-block;
    padding: 3% 5% 3% 5%;
  }
  h4 {
    font-size: 18px;
  }
  .name_input {
    font-size: 33px;
  }
  .title {
    font-size: 38px;
    line-height: 40px;
  }
}
</style>
<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
// import { mapState } from "vuex";
/**
 * Create Playlist Pop Up to input the new playlist name
 * @displayName Create Playlist Pop Up
 * @example [none]
 */
export default {
  name: "CreatePlaylist",
  data: function() {
    return {
      playlistname: "",
      // withtrack:false
    };
  },
  //showModal:false,
  components: {},
  computed: {
    // ...mapState({
    //   Playlists: (state) => state.Playlist.Playlists,
    // }),
    ...mapGetters({
      showModal: "Playlist/showModal",
      username: "Authorization/Username",
      withtrack: "Playlist/withtrack",
    }),
  },
  methods: {
    /**
     * triggers the closing of popup
     * @public This is a public method
     */

    changeModalState() {
      this.$store.dispatch("Playlist/toggleModal", this.withtrack);
    },
    /**
     * triggers the create playlist request
     * @public This is a public method
     */
    CreatePlaylist() {
      var payload;
      if (this.playlistname) {
        payload = {
          name: this.playlistname,
          images: require("../assets/defaultplaylist.png"),
          owner: this.username,
        };
      } else {
        payload = {
          name: "New Playlist",
          images: require("../assets/defaultplaylist.png"),
          owner: this.username,
        };
      }
      this.$store.dispatch("Playlist/CreatePlaylist", payload);
    },
  },
};
</script>
