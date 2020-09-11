<template>
  <v-navigation-drawer app v-model="enableDrawer" clipped expand-on-hover>
    <v-list
        dense
        nav
        class="py-0">
      <v-list-item two-line>
        <v-list-item-avatar>
          <img alt="Text" src="https://randomuser.me/api/portraits/men/81.jpg">
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
          :href="item.href"
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
      <v-list-item link>
        <v-list-item-icon>
          <v-icon> mdi-exit-run</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-navigation-drawer>
</template>
<script>
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
      username: "vinh-ngu@hotmail.com",
      role: "admin",
      addBtnLoading: false,
      hostName: "",
      hostDescription: "",
    }
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
      this.enableDrawer = isAuthenticated;
    },
  },
  methods: {
    addHost: function () {
    }
  }
};
</script>

