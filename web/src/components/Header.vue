<template>
  <v-container>
    <v-app-bar fixed clipped-left dense app dark>
      <v-app-bar-nav-icon v-if="isAuthenticated" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <a @click="navigateTo('/dashboard')">
        <v-img src="../assets/logo.png" max-width="10mm"></v-img>
      </a>
      <v-toolbar-title
          style="width: 500px; font-size: 28px"
          class="ml-0 pl-2">
        <a @click="navigateTo('/dashboard')" class="hidden-sm-and-down" style="color:white">Jobby</a>
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
import AuthService from "@/services/authService";

export default {
  computed: {
    isAuthenticated() {
      return store.getters.isAuthenticated
    }
  },
  data() {
    return {
      drawer: store.getters.isAuthenticated
    }
  },
  watch: {
    drawer: function (val) {
      this.$root.$emit('menu_drawer_clicked', val);
    }
  },
  methods: {
    navigateTo: function (path) {
      if (this.$router.currentRoute.fullPath !== path) {
        this.$router.push(path);
      }
    },
    logout: function () {
      AuthService.logout();
    }
  }
}
</script>
