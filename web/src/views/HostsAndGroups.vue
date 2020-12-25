<template>
  <v-container>
    <view-headers header="Hosts"></view-headers>
    <v-row justify="center">
      <v-card>
        <v-tabs v-model="selectedTab" background-color="white" color="black accent-4" left>
          <v-tab>Hosts</v-tab>
          <v-tab>HostGroups</v-tab>
          <v-tab-item>
            <Hosts></Hosts>
          </v-tab-item>
          <v-tab-item>
            <HostGroups></HostGroups>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>

import ViewHeaders from "@/components/ViewHeader";
import Hosts from "@/components/Hosts";
import HostGroups from "@/components/HostGroups";

export default {
  name: 'Home',
  components: {ViewHeaders, Hosts, HostGroups},
  data() {
    var selectedTab = 0;
    switch (this.$route.params.view) {
      case 'hosts':
        selectedTab = 0;
        break;
      case 'hostgroups':
        selectedTab = 1;
        break;
      default:
        selectedTab = 0;
    }
    return {
      selectedTab: selectedTab,
    }
  }
}
</script>
<style></style>