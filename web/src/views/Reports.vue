<template>
  <v-container>
    <view-headers header="Reports"></view-headers>
    <v-row justify="center">
      <v-card :loading="loading" min-width="1200" max-width="1200" min-height="1100">
        <v-row justify="center">
          <view-sub-header header="Filter"></view-sub-header>
        </v-row>
        <v-container>
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
              <v-btn color="success" :loading="loading" class="mr-3 ml-3" @click="applyFilter">Filter</v-btn>
              <v-btn class="mr-6 ml-3" @click="applyReset">Reset</v-btn>
            </v-col>
          </v-row>
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
                <v-btn small outlined icon color="green" @click="$router.push(`/report/${item.id}/read`)">
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>
                <v-btn small outlined icon color="orange" @click="$router.push(`/report/${item.id}/update`)">
                  <v-icon>mdi-lead-pencil</v-icon>
                </v-btn>
                <v-btn small outlined icon color="red" @click="$router.push(`/report/${item.id}/delete`)">
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
      statusItems: [
        'All',
        'success',
        'failure',
        'warning',
        'error',
      ],
      statusFilter: "All",
      jobFilter: 0,
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
    applyReset: function () {
      this.statusFilter = "All";
      this.jobFilter = 0;
    },
    previousPage: function () {
      this.currentPage -= 1;
      this.fetchData(this.statusFilter, this.jobFilter);
    },
    applyFilter: function () {
      this.fetchData(this.statusFilter, this.jobFilter);
    },
    fetchData: function (statusFilter, jobFilter) {
      this.loading = true;
      this.hasNext = false;
      this.hasPrevious = false;
      let urlParams = `?limit=${this.pageSize}&offset=${this.pageSize * (this.currentPage - 1)}`;

      if (statusFilter && statusFilter !== 'All') {
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
        this.jobItems = [{name: "All", id: 0}];
        this.jobItems = this.jobItems.concat(data.results);
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