<template>
  <span>
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
          <button class="cancel" @click="changeModalState">
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
              ></path>
            </svg>
            <!-- <i class="fa fa-times"  id="myicon" ></i>-->
          </button>

          <h1 class="title">Are you sure,you want to delete this song!!</h1>

          <button class="cancel_button" @click="changeModalState">
            cancle
          </button>
          <button
            class="delete_button"
            testid="confirm_create"
            @click.prevent="DeleteSong(id)"
            @click="changeModalState"
          >
            Delete
          </button>
        </div>
      </transition>
    </div>
  </span>
</template>
<style scoped>
.delete_button {
  position: fixed;
  top: 60%;
  left: 50%;
  appearance: none;
  outline: none;
  border: none;
  background: none;
  cursor: pointer;
  margin: 20px;
  height: 50px;
  width: 180px;
  padding: 8px 34px;
  background-color: #1ed760;
  border-radius: 26px;
  border-color: transparent;

  color: #fff;
  font-size: 18px;
  font-weight: 700;

  box-shadow: 3px 3px rgba(0, 0, 0, 0.4);
  transition: 0.4s ease-out;
}
.cancel_button {
  position: fixed;
  top: 60%;
  left: 35%;
  appearance: none;
  outline: none;

  background: none;
  cursor: pointer;
  margin: 20px;
  height: 50px;
  width: 180px;
  padding: 8px 34px;
  background-color: transparent;
  border-radius: 26px;
  border-color: #fff;

  color: #fff;
  font-size: 18px;
  font-weight: 700;

  transition: 0.4s ease-out;
}

.modal-overlay {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: none;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  width: 100%;
  height: 200%;
  background-color: rgba(0, 0, 0, 0);
}

.modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: table;
  transition: opacity 0.3s ease;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(-50%) translateX(100vw);
}
.cancel {
  position: absolute;
  left: 50%;
  top: 10%;
  display: inline-block;
  background-color: transparent;
  color: #fff;

  border: none;
}
.title {
  position: absolute;
  top: 15%;
  display: block;
  font-size: 48px;
  line-height: 56px;
  letter-spacing: -0.005em;
  color: #fff;
  text-transform: none;
  text-align: center;
  margin: 16px 0;
  width: 100%;
}
</style>
<script>
import { mapGetters } from "vuex";
/**
 * Delete song Pop Up to confirm delete action(not complete)
 * @displayName Delete song Pop Up
 * @example [none]
 */
export default {
  computed: {
    ...mapGetters({
      showModal: "Playlist/showModal",
    }),
  },
  methods: {
    /**
     * triggers the closing of popup
     * @public This is a public method
     */

    changeModalState() {
      this.$store.dispatch("Playlist/toggleModal");
    },
    /**
     * triggers the delete song request
     * @public This is a public method
     */
    DeleteSong(id) {
      console.log(id);
      this.$store.dispatch("UserPropreties/DeletePlaylist", id);
      console.log("removed");
    },
  },
};
</script>
