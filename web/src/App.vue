<template>
  <v-app>
    <v-main>
      <Header></Header>
      <NavBar></NavBar>
      <v-content>
        <router-view></router-view>
      </v-content>
      <Footer></Footer>
    </v-main>
  </v-app>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';
import NavBar from "@/components/NavBar";

export default {
  name: 'App',

  components: {
    NavBar,
    Header,
    Footer
  },

  data: () => ({}),
};
</script>
