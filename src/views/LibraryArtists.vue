<template>
  <div>
    <div class="loading" v-if="!loadingartists">
      <i class="fa fa-spinner fa-spin"></i>
    </div>
    <div v-if="loadingartists" class="notloading">
      <lib-artists-default v-if="artists1.length == 0" />
      <h2 v-if="artists1.length">Artists</h2>
      <div class="container">
        <div class="row">
          <lib-artists
            v-for="artist in artists1"
            :key="artist.id"
            :images="
              $url +
                '/api/images/' +
                artist.images[0]._id +
                '?belongs_to=artist'
            "
            :name="artist.Name"
            :artistId="artist._id"
            :type="'Artist'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: center;
  i {
    color: #fff;
    font-size: 70px;
    margin-top: 100px;
  }
}
h2 {
  font-size: 28px;
  font-weight: bold;
  color: white;
  margin-bottom: 14px;
  margin-left: 30px;
  margin-top: 80px;
}
.container {
  margin-left: 15px;
}
</style>

<script>
import LibArtistsDefault from "@/components/LibArtistsDefault.vue";
import LibArtists from "@/components/LibArtists.vue";
import { mapGetters } from "vuex";
/**
 * library artists page is where artists followed by the user exist
 * @displayName Library Artists page
 * @example [none]
 */
export default {
  name: "library-artists",
  components: {
    LibArtistsDefault,
    LibArtists,
  },
  mounted() {
    this.$store.dispatch("UserLibrary/showUserArtists");
  },
  computed: {
    ...mapGetters({
      // map `this.artists1` to `this.$store.getters.artists`
      artists1: "UserLibrary/artists",
      loadingartists: "UserLibrary/loadingartists",
    }),
  },
};
</script>
