<template>
  <v-container>
    <view-headers header="Reports"></view-headers>
    <v-row justify="center">
      <v-card :loading="loading" min-width="1100" max-width="1100" min-height="1150">
        <v-container>
          <v-row justify="center">
            <view-sub-header header="Filter"></view-sub-header>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                  outlined
                  dense
                  hint="Filter by Status"
                  :items="statusItems"
                  v-model="statusFilter"
                  label="Status">
              </v-select>
            </v-col>
            <v-col>
              <v-select
                  outlined
                  dense
                  :items="jobItems"
                  item-text="name"
                  item-value="id"
                  hint="Filter by Job"
                  menu-props=""
                  v-model="jobFilter"
                  label="Job">
              </v-select>
            </v-col>
            <v-col>
              <v-btn class="mr-3 ml-3" @click="applyFilter">Filter</v-btn>
              <v-btn class="mr-6 ml-3">Reset</v-btn>
            </v-col>
          </v-row>
        </v-container>
        <v-container>
          <v-row justify="center">
            <view-sub-header header="Items"></view-sub-header>
          </v-row>
        </v-container>
        <v-simple-table fixed-header>
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-left" style="font-size: 16px">Job</th>
              <th class="text-left" style="font-size: 16px">Status</th>
              <th class="text-left" style="font-size: 16px">Created At</th>
              <th class="text-left" style="font-size: 16px">Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in reports" :key="item.id">
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
  </v-container>
</template>

<script>

import JobbyApi from "@/services/jobbyApi";
import ViewHeaders from "@/components/ViewHeader";
import ViewSubHeader from "@/components/ViewSubHeader";
import Paginator from "@/components/Paginator";
import util from "@/services/util";

export default {
  name: 'Home',
  components: {Paginator, ViewHeaders, ViewSubHeader},
  data() {
    return {
      loading: false,
      maxTextLen: 30,

      // Paginator
      currentPage: 1,
      hasNext: false,
      hasPrevious: false,
      pageSize: 15,

      // Filter
      statusItems: ['success', 'error', 'warning'],
      statusFilter: "",
      jobFilter: "",
      jobItems: [],
      reports: [],
    }
  },
  created() {
    this.fetchData(this.statusFilter, this.jobFilter);
  },
  methods: {
    nextPage: function () {
      this.currentPage += 1;
      this.fetchData(this.statusFilter, this.jobFilter);
    },
    previousPage: function () {
      this.currentPage -= 1;
      this.fetchData(this.statusFilter, this.jobFilter);
    },
    applyFilter: function () {
      console.log(`Status ${this.statusFilter}`);
      console.log(`Job-Id ${this.jobFilter}`);
      this.fetchData(this.statusFilter, this.jobFilter);
    },
    fetchData: function (statusFilter, jobFilter) {
      this.loading = true;
      this.hasNext = false;
      this.hasPrevious = false;
      let urlParams = `?limit=${this.pageSize}&offset=${this.pageSize * (this.currentPage - 1)}`;
      if (statusFilter) {
        urlParams += `&status=${statusFilter}`;
      }

      if (jobFilter) {
        urlParams += `&jobId=${jobFilter}`;
      }
      JobbyApi.listReports(urlParams).then((data) => {
        this.reports = util.formatObjectTexts(data.results, this.maxTextLen);
        this.hasNext = data.next != null;
        this.hasPrevious = data.previous != null;
        this.loading = false;
      })
      const urlParams2 = `?limit=1000`;
      JobbyApi.listJobs(urlParams2).then((data) => {
        this.jobItems = data.results;
        this.loading = false;
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