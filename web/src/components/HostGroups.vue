<template>
  <v-card min-width="1100" max-width="1100" min-height="100%">
    <v-row justify="center">
      <view-sub-header header="Items"></view-sub-header>
    </v-row>
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
          <td>{{ item.name_formatted }}</td>
          <td>{{ item.description_formatted }}</td>
          <td>{{ item.created_at }}</td>
          <td>
            <v-btn small outlined icon color="green" @click="$router.push(`/hostgroup/${item.id}/read`)">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn small outlined icon color="orange" @click="$router.push(`/hostgroup/${item.id}/update`)">
              <v-icon>mdi-lead-pencil</v-icon>
            </v-btn>
            <v-btn small outlined icon color="red" @click="$router.push(`/hostgroup/${item.id}/delete`)">
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
        @next-page="nextPage"
        @previous-page="previousPage"
        :has-next="hasNextHostGroup"
        :has-previous="hasPreviousHostGroup">
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
      hostgroups: [],
      selectedTab: 0,

      maxTextLen: 30,

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
      if (this.selectedTab === 1) this.currentPageHostGroup += 1;
      this.fetchData();
    },
    previousPage: function () {
      if (this.selectedTab === 1) this.currentPageHostGroup -= 1;
      this.fetchData();
    },
    fetchData: function () {

      const urlParams2 = `?limit=${this.pageSize}&offset=${this.pageSize * (this.currentPageHostGroup - 1)}`;
      JobbyApi.listHostGroups(urlParams2).then((data) => {
        this.hostgroups = util.formatObjectTexts(data.results, this.maxTextLen);
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