<template>
  <v-container>
    <view-headers header="Reports"></view-headers>
    <v-row justify="center">
      <v-card min-width="1100" min-height="900">
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
          <Paginator class="card-actions"
              @next-page="nextPage"
              @previous-page="previousPage"
              :has-next="hasNext"
              :has-previous="hasPrevious">
          </Paginator>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-row>
    </v-row>
  </v-container>
</template>

<script>

import JobbyApi from "@/services/jobbyApi";
import ViewHeaders from "@/components/ViewHeader";
import Paginator from "@/components/Paginator";

export default {
  name: 'Home',
  components: {Paginator, ViewHeaders},
  data() {
    return {

      // Paginator
      currentPage: 1,
      hasNext: false,
      hasPrevious: false,
      pageSize: 15,

      reports: [],
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    nextPage: function () {
      this.currentPage += 1;
      this.fetchData();
    },
    previousPage: function () {
      this.currentPage -= 1;
      this.fetchData();
    },
    fetchData: function () {
      this.hasNext = false;
      this.hasPrevious = false;
      const urlParams = `?limit=${this.pageSize}&offset=${this.pageSize * (this.currentPage - 1)}`;
      JobbyApi.listReports(urlParams).then((data) => {
        this.reports = data.results;
        this.hasNext = data.next != null;
        this.hasPrevious = data.previous != null;
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