<template>
  <v-container>
    <view-headers header="Jobs"></view-headers>
    <v-row justify="center">
      <v-card>
        <v-tabs v-model="selectedTab" background-color="white" color="black accent-4" left>
          <v-tab>Jobs</v-tab>
          <v-tab>JobGroups</v-tab>
          <v-tab-item>
            <Jobs></Jobs>
          </v-tab-item>
          <v-tab-item>
            <JobGroups></JobGroups>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import ViewHeaders from "@/components/ViewHeader";
import Jobs from "@/components/Jobs";
import JobGroups from "@/components/JobGroups";

export default {
  name: 'Home',
  components: {ViewHeaders, JobGroups, Jobs},
  data() {
    return {
      selectedTab: 0,
    }
  },
}
</script>
<style>
th {
  font-weight: bold;
  text-decoration: underline;
}

.card-actions {
  position: absolute;
  bottom: 0;
}
</style>
