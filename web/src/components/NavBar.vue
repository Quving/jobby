<template>
  <v-container>
    <v-navigation-drawer app v-model="enableDrawer" clipped expand-on-hover>
      <v-list dense nav>
        <v-list-item two-line class="px-0">
          <v-list-item-avatar>
            <img alt="Text" :src="gravatarUrl">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ username }}</v-list-item-title>
            <v-list-item-subtitle> {{ role }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item
            v-for="item in navbarOptions"
            :key="item.title"
            @click="navigateTo(item.href)"
            link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list-item link @click="logout">
          <v-list-item-icon>
            <v-icon> mdi-exit-run</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>
  </v-container>
</template>
<script>
import AuthService from "@/services/AuthService";

const md5 = require('md5');

export default {
  name: 'App',
  components: {},
  data() {
    return {
      enableDrawer: this.$store.getters.isAuthenticated,
      navbarOptions: [
        {title: 'Dashboard', icon: 'mdi-view-dashboard', href: '/dashboard'},
        {title: 'Jobs', icon: 'mdi-calendar-clock', href: '/jobs'},
        {title: 'Hosts', icon: 'mdi-laptop', href: '/hosts'},
        {title: 'About', icon: 'mdi-help-box', href: '/about'},
      ],
      username: "",
      role: "",
      addBtnLoading: false,
      gravatarUrl: '',
    }
  },
  created() {
    this.fetchUserdata();
  },
  mounted() {
    this.$root.$on('menu_drawer_clicked', (val) => {
      if (this.$store.getters.isAuthenticated) {
        this.enableDrawer = val;
      }
    });
  },
  watch: {
    "$store.getters.isAuthenticated": function (isAuthenticated) {
      this.fetchUserdata();
      this.enableDrawer = isAuthenticated;
    },
  },
  methods: {
    navigateTo: function (path) {
      if (this.$router.currentRoute.fullPath !== path) {
        this.$router.push(path);
      }
    },
    fetchUserdata: function () {
      AuthService.fetchUserdata().then((userdata) => {
        this.username = userdata.email;
        this.role = new Date(userdata.last_login).toLocaleString();
        this.gravatarUrl = `https://www.gravatar.com/avatar/${md5(userdata.email)}`;
      }, (error) => {
        console.log(error);
      });
    },
    addHost: function () {
    },
    logout: function () {
      AuthService.logout();
    }
  }
};
</script>

