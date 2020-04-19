import { mapGetters } from "vuex";
import { mapState } from "vuex";
///////////////////////////////////////////////////////////////
//creating toast object with function show
const toast = {
  show(message) {
    var mytoast = document.getElementById("liketoast");
    //cleartimeout used to reset the 3 seconds every time so not to override time when open another one while the first one is still shown
    clearTimeout(mytoast.hideTimeout);
    mytoast.textContent = message;
    mytoast.className = "toast toast--visible";
    mytoast.hideTimeout = setTimeout(() => {
      mytoast.classList.remove("toast--visible");
    }, 2000);
    console.log("message", message);
  }
};

////////////////////////////////////////////////////////////
export default {
  data: function() {
    return {
      song_state: false //0=>Not playing 1=>playing
    };
  },
  methods: {
    ////////////////////////////////////
    // useraccount : function(){
    // if (this.user != "success")
    // {
    //  var nouser_songinfo = document.getElementById("song_info_col");
    //  //var nouser_buttons = document.querySelectorAll("buttons");
    //  //var nouser_sliders = document.querySelectorAll("input");
    //  nouser_songinfo.style.visibility = "hidden";
    // }
    // },
    ////////////////////////////////////
    /**
     * this function is to play current song
     * @public This is a public method
     * @param {Number} index index of song in the playlist or album
     * @param {String} song_id id of the current song
     * @param {String} album_id id of the album where the song exists
     * @param {String} playlist_id id of the playlist where the song exists
     */
    playSong() {
      this.song_state = true;
      let info;
      if (
        "playicon-component" == event.target.id ||
        "songComp" == event.target.id
      ) {
        info = {
          index: this.index,
          song_id: this.song_id,
          album_id: this.albumId,
          playlist_id: this.playlistId,
          is_playlist: this.isPlaylist
        };
        if (
          this.song_id == this.Get_Currentsong.track._id &&
          this.albumId == this.Get_Currentsong.album._id &&
          // this.index == this.currentsong_info.index &&
          this.playlistId == this.Get_Currentsong.playlistId
        ) {
          this.$store.dispatch("mediaplayer/playsong_state", info);
          console.log("my compmmm", {
            index: this.index,
            song_id: this.song_id,
            album_id: this.albumId,
            playlist_id: this.playlistId,
            is_playlist: this.isPlaylist
          });
        } else {
          this.$store.dispatch("Queue/CreateQueue", info);
          console.log("my comp", {
            index: this.index,
            song_id: this.song_id,
            album_id: this.albumId,
            playlist_id: this.playlistId,
            is_playlist: this.isPlaylist
          });
        }
      } else {
        info = {
          song_id: this.Get_Currentsong.track._id,
          album_id: this.Get_Currentsong.track.albumId,
          playlist_id: this.Get_Currentsong.playlistId,
          is_playlist: this.Get_Currentsong.isPlaylist
        };
        console.log("nihal comp",info);
        this.$store.dispatch("Queue/CreateQueue", info);
      }
    },
    /**
     * this function is to pause current song
     * @public This is a public method
     */
    pauseSong() {
      this.song_state = false;
      console.log("pause song");
      this.$store.dispatch("mediaplayer/pausesong_state");
    },
    /**
     * this function is to get the previous song in playlist or album
     * @public This is a public method
     */
    prev_song: function() {
      if (this.currentsong_info.index != 0)
        this.$store.dispatch("mediaplayer/prevsong_state");
    },
    /**
     * this function is to get the next song in playlist or album
     * @public This is a public method
     */
    next_song: function() {
      this.$store.dispatch("mediaplayer/nextsong_state");
    },
    /**
     * this function is used to random the play of songs inside the playlist and it appears also in the queue
     * @public This is a public method
     */
    random_songs: function() {
      this.$store.dispatch("mediaplayer/shufflesong_state");
    },
    /**
     * this function is to like the current song and save it to user's liked tracks page
     * @public This is a public method
     */
    likecurrentsong: function() {
      if (!this.liked) {
        this.$store.dispatch("mediaplayer/Like", "");
        toast.show("Added to your Liked Songs");
      } else {
        this.$store.dispatch("mediaplayer/UnLike", "");
        toast.show("Removed from your Liked Songs");
      }
    },
    /**
     * this function is used to change the router according to place stands for if inside playlist or album then move to queue on click and vice versa
     * @public This is a public method
     */
    queue_alter: function() {
      if (this.$router.currentRoute.path == "/HomeWebPlayer/queue") {
        this.$router.go(-1);
      } else {
        this.$router.push("/HomeWebPlayer/queue");
      }
    }
  },
  computed: {
    ...mapState({
      media_player: state => state.mediaplayer.songs
    }),
    ...mapGetters({
      playicon: "mediaplayer/playicon",
      user: "authorization/GetStatus",
      liked: "mediaplayer/liked",
      currentaudio: "mediaplayer/currentaudio",
      progress: "mediaplayer/progress",
      duration: "mediaplayer/duration",
      volume: "mediaplayer/volume",
      currentsong_info: "mediaplayer/currentsong_info",
      Get_Currentsong: "mediaplayer/Get_Currentsong"
    })
  }
};
