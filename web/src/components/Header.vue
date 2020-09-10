<template>
  <v-container>
    <v-app-bar clipped-left dense app dark>
      <v-icon large> mdi-home</v-icon>
      <v-toolbar-title
          style="width: 500px; font-size: 28px"
          class="ml-0 pl-4">
        <span class="hidden-sm-and-down">Jobby</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="isAuthenticated" @click="logout">
        Logout
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-row justify="center">
    </v-row>
  </v-container>
</template>
<script>
import store from '../store/index';

export default {
  computed: {
    isAuthenticated() {
      return store.getters.isAuthenticated
    }
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    }
  }
}
</script>
