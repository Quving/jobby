<template>
  <v-container>
    <view-headers header="Hosts"></view-headers>
    <v-row justify="center">
      <v-btn class="mb-5 mr-5" color="success" @click="$router.push('/host/create')">Create Host</v-btn>
      <v-btn class="mb-5" color="success" @click="$router.push('/hostgroup/create')">Create HostGroup</v-btn>
    </v-row>
    <v-row justify="center">
      <v-card min-width="800">
        <v-card-title>My Hosts</v-card-title>
        <v-simple-table fixed-header>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left" style="font-size: 16px">Host</th>
              <th class="text-left" style="font-size: 16px">Description</th>
              <th class="text-left" style="font-size: 16px">Created At</th>
              <th class="text-left" style="font-size: 16px">OS</th>
              <th class="text-left" style="font-size: 16px">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in hosts" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.description }}</td>
              <td>{{ item.created_at }}</td>
              <td>{{ item.os }}</td>
              <td>
                <v-btn icon color="green">
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
                <v-btn icon color="orange">
                  <v-icon>mdi-lead-pencil</v-icon>
                </v-btn>
                <v-btn icon color="red">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
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
<style>
th {
  font-weight: bold;
  text-decoration: underline;
}
</style>