<template>
  <v-card min-width="1200" max-width="1200" min-height="100%">
    <v-row justify="center">
      <view-sub-header header="Items"></view-sub-header>
    </v-row>
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
          <td>{{ item.name_formatted }}</td>
          <td>{{ item.hostgroup_detailed.name }}</td>
          <td>{{ item.description_formatted }}</td>
          <td>{{ item.os_formatted }}</td>
          <td>{{ item.created_at }}</td>
          <td>
            <v-btn small outlined icon color="green" @click="$router.push(`/host/${item.id}/read`)">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn small outlined icon color="orange" @click="$router.push(`/host/${item.id}/update`)">
              <v-icon>mdi-lead-pencil</v-icon>
            </v-btn>
            <v-btn small outlined icon color="red" @click="$router.push(`/host/${item.id}/delete`)">
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
        @next-page="nextPage"
        @previous-page="previousPage"
        :has-next="hasNextHost"
        :has-previous="hasPreviousHost">
    </Paginator>
  </v-card>
</template>

<script>

import JobbyApi from "@/services/jobbyApi";
import ViewSubHeader from "@/components/ViewSubHeader";
import Paginator from "@/components/Paginator";
import util from "@/services/util";

export default {
  name: 'Home',
  components: {ViewSubHeader, Paginator},
  data() {
    return {
      hosts: [],
      selectedTab: 0,

      maxTextLen: 30,

      // Paginator
      currentPageHost: 1,
      hasNextHost: false,
      hasPreviousHost: false,
      pageSize: 15,
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    nextPage: function () {
      if (this.selectedTab === 0) this.currentPageHost += 1;
      this.fetchData();
    },
    previousPage: function () {
      if (this.selectedTab === 0) this.currentPageHost -= 1;
      this.fetchData();
    },
    fetchData: function () {
      this.hasNextHost = false;
      this.hasPreviousHost = false;

      const urlParams = `?limit=${this.pageSize}&offset=${this.pageSize * (this.currentPageHost - 1)}`;
      JobbyApi.listHosts(urlParams).then((data) => {
        this.hosts = util.formatObjectTexts(data.results, this.maxTextLen);
        this.hasNextJob = data.next != null;
        this.hasPreviousJob = data.previous != null;
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