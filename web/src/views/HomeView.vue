<template>
  <div class="home">
    <v-layout row>
      <v-container>
        <v-card>
          <v-tabs background-color="white" color="deep-purple accent-4" left>
            <v-tab>+Job</v-tab>
            <v-tab>+JobGroup</v-tab>
            <v-tab>+Host</v-tab>
            <v-tab>+HostGroup</v-tab>
            <v-tab-item>
              <AddJob></AddJob>
            </v-tab-item>
            <v-tab-item>
              <AddJobGroup></AddJobGroup>
            </v-tab-item>
            <v-tab-item>
              <AddHost></AddHost>
            </v-tab-item>
            <v-tab-item>
              <AddHostGroup></AddHostGroup>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-container>
      <v-footer class="mt-12"></v-footer>
    </v-layout>
  </div>
</template>

<script>
import AddHost from '../components/AddHost';
import AddJob from '../components/AddJob';
import AddHostGroup from '../components/AddHostGroup';
import AddJobGroup from '../components/AddJobGroup';

export default {
  name: 'Home',
  data() {
    return {}
  },
  components: {
    AddJob,
    AddJobGroup,
    AddHost,
    AddHostGroup,
  },
  watch: {},
  created() {
  },
  methods: {},
}
</script>
