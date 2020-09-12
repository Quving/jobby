<template>
  <v-container>
    <h1 class="text-center">JOBS</h1>
    <v-row>
      <v-col>
        <v-card>
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
      </v-col>
    </v-row>
    <v-row>
      <v-container>
        <v-btn color="success">Register New Job</v-btn>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import JobbyApi from "@/services/JobbyApi";

export default {
  name: 'Home',
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
