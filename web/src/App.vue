<template>
  <v-app>
    <Header></Header>
    <NavBar></NavBar>
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
