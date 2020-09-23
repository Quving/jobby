<template>
  <v-container>
    <view-headers header="Jobs"></view-headers>
    <v-row justify="center">
      <v-btn class="mb-5 mr-5" color="success" @click="$router.push('/job/create')">Create Job</v-btn>
      <v-btn class="mb-5" color="success" @click="$router.push('/jobgroup/create')">Create JobGroup</v-btn>
    </v-row>
    <v-row justify="center">
      <v-card min-width="800">
        <v-card-title>My Jobs</v-card-title>
        <v-simple-table fixed-header>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left">Job</th>
              <th class="text-left">Description</th>
              <th class="text-left">Created At</th>
              <th class="text-left">Host</th>
              <th class="text-left">Job Group</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in jobs" :key="item.name">
              <td>{{ item.name }}</td>
              <td>{{ item.description }}</td>
              <td>{{ new Date(item.created_at).toLocaleString() }}</td>
              <td>{{ item.host }}</td>
              <td>{{ item.jobgroup }}</td>
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
      jobs: [],
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData: function () {
      JobbyApi.listJobs().then((data) => {
        this.jobs = data;
      })
    }
  },
}
</script>
