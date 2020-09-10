<template>
  <v-container style="color: white">
    <v-navigation-drawer
        expand-on-hover
        absolute>
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
        <v-list-item class="mb-10" link>
          <v-list-item-icon>
            <v-icon> mdi-view-dashboard</v-icon>
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
export default {
  name: 'App',
  components: {},
  data: () => ({
    drawer: true,
    navbarOptions: [
      {title: 'Dashboard', icon: 'mdi-view-dashboard'},
      {title: 'Jobs', icon: 'mdi-image'},
      {title: 'Hosts', icon: 'mdi-image'},
      {title: 'About', icon: 'mdi-help-box'},
    ],
    username: "vinh-ngu@hotmail.com",
    role: "admin",
    addBtnLoading: false,
    hostName: "",
    hostDescription: "",
  }),
  methods: {
    addHost: function () {

    }
  }
};
</script>

