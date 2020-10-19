<template>
  <v-container>
    <view-headers header="Jobs"></view-headers>
    <v-row justify="center">
      <v-card>
        <v-tabs v-model="selectedTab" background-color="white" color="deep-purple accent-4" left>
          <v-tab>Jobs</v-tab>
          <v-tab>JobGroups</v-tab>
          <v-tab-item>
            <v-card min-width="1100" min-height="850">
              <v-card-title>My Jobs</v-card-title>
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
                    <td>{{ item.name }}</td>
                    <td>{{ item.jobgroup_detailed.name }}</td>
                    <td>{{ item.description }}</td>
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
                <v-btn color="success" @click="$router.push('/job/new/create')">Create Job</v-btn>
              </v-card-actions>
              <Paginator
                  class="card-actions mb-10"
                  @next-page="nextPage"
                  @previous-page="previousPage"
                  :has-next="hasNextJob"
                  :has-previous="hasPreviousJob">
              </Paginator>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card min-width="1100" min-height="850">
              <v-card-title>My Jobgroups</v-card-title>
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
                  <tr v-for="item in jobgroups" :key="item.name">
                    <td>{{ item.name }}</td>
                    <td>{{ item.description }}</td>
                    <td>{{ new Date(item.created_at).toLocaleString() }}</td>
                    <td>
                      <v-btn icon color="green" @click="$router.push(`/jobgroup/${item.id}/read`)">
                        <v-icon>mdi-magnify</v-icon>
                      </v-btn>
                      <v-btn icon color="orange" @click="$router.push(`/jobgroup/${item.id}/update`)">
                        <v-icon>mdi-lead-pencil</v-icon>
                      </v-btn>
                      <v-btn icon color="red" @click="$router.push(`/jobgroup/${item.id}/delete`)">
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
                  class="card-actions mb-10"
                  @next-page="nextPage"
                  @previous-page="previousPage"
                  :has-next="hasNextJobGroup"
                  :has-previous="hasPreviousJobGroup">
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
      jobs: [],
      jobgroups: [],
      selectedTab: 0,

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
        this.jobs = data.results;
        this.hasNextJob = data.next != null;
        this.hasPreviousJob = data.previous != null;
      });
      const urlParams2 = `?limit=${this.pageSize}&offset=${this.pageSize * (this.currentPageJobGroup - 1)}`;
      JobbyApi.listJobGroups(urlParams2).then((data) => {
        this.jobgroups = data.results;
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

.card-actions {
  position: absolute;
  bottom: 0;
}
</style>
