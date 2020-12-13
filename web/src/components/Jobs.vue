<template>
  <v-card min-width="1100" max-width="1100" min-height="900">
    <v-container>
      <v-row justify="center">
        <view-sub-header header="Filter"></view-sub-header>
      </v-row>
      <v-container class="mr-3 ml-3">
        <v-row>
          <v-text-field
              outlined
              dense
              class="mr-3 ml-3"
              hint="Filter by Job"
              v-model="jobFilter"
              label="Job">
          </v-text-field>
          <v-text-field
              outlined
              dense
              class="mr-3 ml-3"
              hint="Filter by Description"
              v-model="descriptionFilter"
              label="Description">
          </v-text-field>
          <v-text-field
              outlined
              dense
              class="mr-3 ml-3"
              hint="Filter by Host"
              v-model="hostFilter"
              label="Host">
          </v-text-field>
          <v-btn class="mr-3 ml-3">Filter</v-btn>
          <v-btn class="mr-6 ml-3">Reset</v-btn>
        </v-row>
      </v-container>
      <v-row justify="center">
        <view-sub-header header="Items"></view-sub-header>
      </v-row>
      <v-simple-table fixed-header>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left" style="font-size: 16px">Job</th>
            <th class="text-left" style="font-size: 16px">Job Group</th>
            <th class="text-left" style="font-size: 16px">Description</th>
            <th class="text-left" style="font-size: 16px">Host</th>
            <th class="text-left" style="font-size: 16px">Created At</th>
            <th class="text-left" style="font-size: 16px">Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in jobs" :key="item.name">
            <td>{{ item.name_formatted }}</td>
            <td>{{ item.jobgroup_detailed.name }}</td>
            <td>{{ item.description_formatted }}</td>
            <td>{{ item.host_detailed.name }}</td>
            <td>{{ new Date(item.created_at).toLocaleString() }}</td>
            <td>
              <v-btn icon color="green"
                     @click="$router.push(`/job/${item.id}/read`)">
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
              <v-btn icon color="orange"
                     @click="$router.push(`/job/${item.id}/update`)">
                <v-icon>mdi-lead-pencil</v-icon>
              </v-btn>
              <v-btn icon color="red"
                     @click="$router.push(`/job/${item.id}/delete`)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-card-actions class="card-actions">
        <v-btn color="success" @click="$router.push('/job/new/create')">Add Job</v-btn>
      </v-card-actions>
      <Paginator
          class="card-actions mb-10"
          @next-page="nextPage"
          @previous-page="previousPage"
          :has-next="hasNextJob"
          :has-previous="hasPreviousJob">
      </Paginator>
    </v-container>
  </v-card>
</template>
<script>
import ViewSubHeader from "@/components/ViewSubHeader";
import JobbyApi from '@/services/jobbyApi';
import util from "@/services/util";
import Paginator from "@/components/Paginator";

export default {
  name: 'Home',
  components: {ViewSubHeader, Paginator},
  data() {
    return {
      jobs: [],
      jobgroups: [],
      selectedTab: 0,

// Filter
      jobFilter: '',
      descriptionFilter: '',
      hostFilter: '',
// Format
      textMaxLen: 30,

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
      if (this.selectedTab === 0) this.currentPageJob += 1;
      if (this.selectedTab === 1) this.currentPageJobGroup += 1;
      this.fetchData();
    },
    previousPage: function () {
      if (this.selectedTab === 0) this.currentPageJob -= 1;
      if (this.selectedTab === 1) this.currentPageJobGroup -= 1;
      this.fetchData();
    },
    fetchData: function () {
      this.hasNextJob = false;
      this.hasPreviousJob = false;
      this.hasNextJobGroup = false;
      this.hasPreviousJobGroup = false;

      const urlParams = `?limit=${this.pageSize}&offset=${this.pageSize * (this.currentPageJob - 1)}`;
      JobbyApi.listJobs(urlParams).then((data) => {
        this.jobs = util.formatObjectTexts(data.results, this.textMaxLen);
        this.hasNextJob = data.next != null;
        this.hasPreviousJob = data.previous != null;
      });
      const urlParams2 = `?limit=${this.pageSize}&offset=${this.pageSize * (this.currentPageJobGroup - 1)}`;
      JobbyApi.listJobGroups(urlParams2).then((data) => {
        this.jobgroups = util.formatObjectTexts(data.results, this.textMaxLen);
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