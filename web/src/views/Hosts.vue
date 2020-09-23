<template>
  <v-container>
    <view-headers header="Hosts"></view-headers>
    <v-row justify="center">
      <v-btn class="mb-5 mr-5" color="success" @click="$router.push('/hosts/create')">Create Host</v-btn>
      <v-btn class="mb-5" color="success" @click="$router.push('/hostgroups/create')">Create HostGroup</v-btn>
    </v-row>
    <v-row justify="center">
      <v-card min-width="800">
        <v-card-title>My Hosts</v-card-title>
        <v-simple-table fixed-header>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">Host</th>
              <th class="text-left">Description</th>
              <th class="text-left">OS</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in hosts" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.description }}</td>
              <td>{{ item.os }}</td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>

import JobbyApi from "@/services/jobbyApi";
import ViewHeaders from "@/components/ViewHeader";

export default {
  name: 'Home',
  components: {ViewHeaders},
  data() {
    return {
      hosts: [],
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData: function () {
      JobbyApi.listHosts().then((data) => {
        this.hosts = data;
      })
    }
  },
}
</script>
