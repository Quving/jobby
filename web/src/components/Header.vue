<template>
  <v-container>
    <v-app-bar fixed clipped-left dense app dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-icon large> mdi-home</v-icon>
      <v-toolbar-title
          style="width: 500px; font-size: 28px"
          class="ml-0 pl-4">
        <a @click="$router.push('/dashboard')" class="hidden-sm-and-down" style="color:white">Jobby</a>
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
import AuthService from "@/services/AuthService";

export default {
  computed: {
    isAuthenticated() {
      return store.getters.isAuthenticated
    }
  },
  data() {
    return {
      drawer: false
    }
  },
  watch: {
    drawer: function (val) {
      this.$root.$emit('menu_drawer_clicked', val);
    }
  },
  methods: {
    logout: function () {
      AuthService.logout();
    }
  }
}
</script>
