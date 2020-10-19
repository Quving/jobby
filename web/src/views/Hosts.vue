<template>
  <v-container>
    <view-headers header="Hosts"></view-headers>
    <v-row justify="center">
      <v-card>
        <v-tabs v-model="selectedTab" background-color="white" color="deep-purple accent-4" left>
          <v-tab>Hosts</v-tab>
          <v-tab>HostGroups</v-tab>
          <v-tab-item>
            <v-card min-width="1100" min-height="850">
              <v-card-title>My Hosts</v-card-title>
              <v-simple-table fixed-header>
                <template v-slot:default>
                  <thead>
                  <tr>
                    <th class="text-left" style="font-size: 16px">Host</th>
                    <th class="text-left" style="font-size: 16px">Hostgroup</th>
                    <th class="text-left" style="font-size: 16px">Description</th>
                    <th class="text-left" style="font-size: 16px">OS</th>
                    <th class="text-left" style="font-size: 16px">Created At</th>
                    <th class="text-left" style="font-size: 16px">Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in hosts" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.hostgroup_detailed.name }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ item.os }}</td>
                    <td>{{ new Date(item.created_at).toLocaleString() }}</td>
                    <td>
                      <v-btn icon color="green" @click="$router.push(`/host/${item.id}/read`)">
                        <v-icon>mdi-magnify</v-icon>
                      </v-btn>
                      <v-btn icon color="orange" @click="$router.push(`/host/${item.id}/update`)">
                        <v-icon>mdi-lead-pencil</v-icon>
                      </v-btn>
                      <v-btn icon color="red" @click="$router.push(`/host/${item.id}/delete`)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <v-card-actions class="card-actions">
                <v-btn color="success" @click="$router.push('/host/new/create')">Create Host</v-btn>
              </v-card-actions>
              <Paginator
                  class="card-actions mb-10"
                  @next-page="nextPage"
                  @previous-page="previousPage"
                  :has-next="hasNextHost"
                  :has-previous="hasPreviousHost">
              </Paginator>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card min-width="1100" min-height="850">
              <v-card-title>My Hostgroups</v-card-title>
              <v-simple-table fixed-header>
                <template v-slot:default>
                  <thead>
                  <tr>
                    <th class="text-left" style="font-size: 16px">Name</th>
                    <th class="text-left" style="font-size: 16px">Description</th>
                    <th class="text-left" style="font-size: 16px">Created At</th>
                    <th class="text-left" style="font-size: 16px">Actions</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in hostgroups" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ new Date(item.created_at).toLocaleString() }}</td>
                    <td>
                      <v-btn icon color="green" @click="$router.push(`/hostgroup/${item.id}/read`)">
                        <v-icon>mdi-magnify</v-icon>
                      </v-btn>
                      <v-btn icon color="orange" @click="$router.push(`/hostgroup/${item.id}/update`)">
                        <v-icon>mdi-lead-pencil</v-icon>
                      </v-btn>
                      <v-btn icon color="red" @click="$router.push(`/hostgroup/${item.id}/delete`)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <v-card-actions class="card-actions">
                <v-btn color="success" @click="$router.push('/hostgroup/new/create')">Create HostGroup
                </v-btn>
              </v-card-actions>
              <Paginator
                  class="card-actions mb-10"
                  @next-page="nextPage"
                  @previous-page="previousPage"
                  :has-next="hasNextHostGroup"
                  :has-previous="hasPreviousHostGroup">
              </Paginator>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>

import JobbyApi from "@/services/jobbyApi";
import ViewHeaders from "@/components/ViewHeader";
import Paginator from "@/components/Paginator";

export default {
  name: 'Home',
  components: {ViewHeaders, Paginator},
  data() {
    return {
      hosts: [],
      hostgroups: [],
      selectedTab: 0,

      // Paginator
      currentPageHost: 1,
      hasNextHost: false,
      hasPreviousHost: false,
      pageSize: 15,
      currentPageHostGroup: 1,
      hasNextHostGroup: false,
      hasPreviousHostGroup: false,
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    nextPage: function () {
      if (this.selectedTab === 0) this.currentPageHost += 1;
      if (this.selectedTab === 1) this.currentPageHostGroup += 1;
      this.fetchData();
    },
    previousPage: function () {
      if (this.selectedTab === 0) this.currentPageHost -= 1;
      if (this.selectedTab === 1) this.currentPageHostGroup -= 1;
      this.fetchData();
    },
    fetchData: function () {
      this.hasNextHost = false;
      this.hasPreviousHost = false;

      const urlParams = `?limit=${this.pageSize}&offset=${this.pageSize * (this.currentPageHost - 1)}`;
      JobbyApi.listHosts(urlParams).then((data) => {
        this.hosts = data.results;
        this.hasNextJob = data.next != null;
        this.hasPreviousJob = data.previous != null;
      });
      const urlParams2 = `?limit=${this.pageSize}&offset=${this.pageSize * (this.currentPageHostGroup - 1)}`;
      JobbyApi.listHostGroups(urlParams2).then((data) => {
        this.hostgroups = data.results;
        this.hasNextJobGroup = data.next != null;
        this.hasPreviousJobGroup = data.previous != null;
      });
    }
  },
}
</script>
<style>
.card-actions {
  position: absolute;
  bottom: 0;
}

th {
  font-weight: bold;
  text-decoration: underline;
}
</style>