<template>
  <v-container>
    <view-headers header="Reports"></view-headers>
    <v-row justify="center">
      <v-card min-width="1000" min-height="800">
        <v-card-title>Reports</v-card-title>
        <v-simple-table fixed-header>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left" style="font-size: 16px">Name</th>
              <th class="text-left" style="font-size: 16px">Job</th>
              <th class="text-left" style="font-size: 16px">Status</th>
              <th class="text-left" style="font-size: 16px">Created At</th>
              <th class="text-left" style="font-size: 16px">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in reports" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.job_detailed.name }}</td>
              <td>{{ item.status }}</td>
              <td>{{ new Date(item.created_at).toLocaleString() }}</td>
              <td>
                <v-btn icon color="green" @click="$router.push(`/report/${item.id}/read`)">
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
                <v-btn icon color="orange" @click="$router.push(`/report/${item.id}/update`)">
                  <v-icon>mdi-lead-pencil</v-icon>
                </v-btn>
                <v-btn icon color="red" @click="$router.push(`/report/${item.id}/delete`)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-card-actions>
          <Pagination
              @next-page="nextPage"
              @previous-page="previousPage"
              :has-next="hasNext"
              :has-previous="hasPrevious">
          </Pagination>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>

import JobbyApi from "@/services/jobbyApi";
import ViewHeaders from "@/components/ViewHeader";
import Pagination from "@/components/Pagination";

export default {
  name: 'Home',
  components: {Pagination, ViewHeaders},
  data() {
    return {
      hasNext: true,
      hasPrevious: true,
      reports: [],
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    nextPage: function () {
      console.log("Next")
    },
    previousPage: function () {
      console.log("Prev")
    },
    fetchData: function () {
      JobbyApi.listReports().then((data) => {
        this.reports = data.results;
      })
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