<template>
  <v-card min-width="100%" min-height="100%">
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
        <tr v-for="item in jobGroups" :key="item.name">
          <td>{{ item.name_formatted }}</td>
          <td>{{ item.description_formatted }}</td>
          <td>{{ item.created_at }}</td>
          <td>
            <v-btn small outlined color="green" @click="$router.push(`/jobgroup/${item.id}/read`)">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn small outlined color="orange" @click="$router.push(`/jobgroup/${item.id}/update`)">
              <v-icon>mdi-lead-pencil</v-icon>
            </v-btn>
            <v-btn small outlined color="red" @click="$router.push(`/jobgroup/${item.id}/delete`)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-card-actions class="card-actions">
      <v-btn color="success" @click="$router.push('/jobgroup/new/create')">Create JobGroup</v-btn>
    </v-card-actions>
    <Paginator
        @next-page="nextPage"
        @previous-page="previousPage"
        :has-next="hasNextJobGroup"
        :has-previous="hasPreviousJobGroup">
    </Paginator>
  </v-card>
</template>

<script>
import JobbyApi from '@/services/jobbyApi';
import ViewSubHeader from "@/components/ViewSubHeader";
import util from "@/services/util";
import Paginator from "@/components/Paginator";

export default {
  name: 'Home',
  components: {Paginator, ViewSubHeader},
  data() {
    return {
      jobGroups: [],
      selectedTab: 0,

      // Filter
      jobFilter: '',
      descriptionFilter: '',
      hostFilter: '',

      // Format
      textMaxLen: 35,

      // Paginator
      currentPageJob: 1,
      hasNextJob: false,
      hasPreviousJob: false,
      pageSize: 15,
      currentPageJobGroup: 1,
      hasNextJobGroup: false,
      hasPreviousJobGroup: false,
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    nextPage: function () {
      if (this.selectedTab === 1) this.currentPageJobGroup += 1;
      this.fetchData();
    },
    previousPage: function () {
      if (this.selectedTab === 1) this.currentPageJobGroup -= 1;
      this.fetchData();
    },
    fetchData: function () {
      this.hasNextJobGroup = false;
      this.hasPreviousJobGroup = false;

      const urlParams2 = `?limit=${this.pageSize}&offset=${this.pageSize * (this.currentPageJobGroup - 1)}`;
      JobbyApi.listJobGroups(urlParams2).then((data) => {
        this.jobGroups = util.formatObjectTexts(data.results, this.textMaxLen);
        console.log(this.jobGroups);
        this.hasNextJobGroup = data.next != null;
        this.hasPreviousJobGroup = data.previous != null;
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