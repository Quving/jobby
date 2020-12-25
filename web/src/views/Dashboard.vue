<template>
  <v-container>
    <view-header header="Dashboard"></view-header>
    <v-row justify="center">
      <v-col cols="5">
        <v-card :loading="allStatsLoaded">
          <v-card-title>Job Reports</v-card-title>
          <v-simple-table fixed-header>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">Type</th>
                <th class="text-left">Numbers</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in reportsSummary" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.amount }}</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col cols="5">
        <v-card :loading="allEntityStatsLoaded">
          <v-card-title>My Entities</v-card-title>
          <v-simple-table fixed-header>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">Type</th>
                <th class="text-left">Numbers</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in entitySummary" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.amount }}</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import ViewHeader from "@/components/ViewHeader";
import jobbyApi from "@/services/jobbyApi";

export default {
  name: 'Home',
  created() {
    this.fetchReportStatistics();
    this.fetchEntityStatistics();
  },
  data() {
    return {
      // Status
      allStatsLoaded: false,
      successReportStatsLoaded: false,
      failureReportsStatsLoaded: false,
      errorReportsStatsLoaded: false,
      totalReportsStatsLoaded: false,

      // Entity
      allEntityStatsLoaded: false,
      successEntityStatsLoaded: false,
      entityTotalJobsStatsLoaded: false,
      entitySTotalJobGroupsStatsLoaded: false,
      entityTotalHostsStatsLoaded: false,
      entityTotalHostGroupStatsLoaded: false,

      reportsSummary: [
        {
          id: 'reports_count_success',
          name: 'Successful',
          amount: 0,
        },
        {
          id: 'reports_count_failure',
          name: 'Failure',
          amount: 0,
        },
        {
          id: 'reports_count_error',
          name: 'Error',
          amount: 0,
        },
        {
          id: 'total_reports',
          name: 'Total Reports',
          amount: 0,
        },
      ],
      entitySummary: [
        {
          id: 'total_jobs',
          name: 'Total Jobs',
          amount: 0,
        },
        {
          id: 'total_jobgroups',
          name: 'Total Jobgroups',
          amount: 0,
        },
        {
          id: 'total_hosts',
          name: 'Total Hosts',
          amount: 0,
        },
        {
          id: 'total_hostgroups',
          name: 'Total Hostgroups',
          amount: 0,
        },
      ]
    }
  },
  components: {ViewHeader},
  methods: {
    updateListElementById(list, selectorValue, newKey, newValue) {
      list.forEach(element => {
        if (element.id === selectorValue) {
          element[newKey] = newValue;
        }
      })
    },
    updateStatsLoadedStatus() {
      this.allStatsLoaded = !(
          this.successReportStatsLoaded &&
          this.failureReportsStatsLoaded &&
          this.errorReportsStatsLoaded);
      this.allEntityStatsLoaded = !(
          this.entityTotalJobsStatsLoaded &&
          this.entityTotalJobGroupStatsLoaded &&
          this.entityTotalHostsStatsLoaded &&
          this.entityTotalHostGroupStatsLoaded);
    },
    fetchReportStatistics() {
      jobbyApi.listReports('?status=success').then((data) => {
        this.updateListElementById(this.reportsSummary, 'reports_count_success', 'amount', data.count)
        this.successReportStatsLoaded = true;
        this.updateStatsLoadedStatus();
      });
      jobbyApi.listReports('?status=failure').then((data) => {
        this.updateListElementById(this.reportsSummary, 'reports_count_failure', 'amount', data.count)
        this.failureReportsStatsLoaded = true;
        this.updateStatsLoadedStatus();
      });
      jobbyApi.listReports('?status=error').then((data) => {
        this.updateListElementById(this.reportsSummary, 'reports_count_error', 'amount', data.count)
        this.errorReportsStatsLoaded = true;
        this.updateStatsLoadedStatus();
      });
      jobbyApi.listReports().then((data) => {
        this.updateListElementById(this.reportsSummary, 'total_reports', 'amount', data.count)
        this.totalReportsStatsLoaded = true;
        this.updateStatsLoadedStatus();
      });
    },
    fetchEntityStatistics() {
      jobbyApi.listJobs().then((data) => {
        this.updateListElementById(this.entitySummary, 'total_jobs', 'amount', data.count)
        this.entityTotalJobsStatsLoaded = true;
        this.updateStatsLoadedStatus();
      });
      jobbyApi.listJobGroups().then((data) => {
        this.updateListElementById(this.entitySummary, 'total_jobgroups', 'amount', data.count)
        this.entityTotalJobGroupStatsLoaded = true;
        this.updateStatsLoadedStatus();
      });
      jobbyApi.listHosts().then((data) => {
        this.updateListElementById(this.entitySummary, 'total_hosts', 'amount', data.count)
        this.entityTotalHostsStatsLoaded = true;
        this.updateStatsLoadedStatus();
      });
      jobbyApi.listHostGroups().then((data) => {
        this.updateListElementById(this.entitySummary, 'total_hostgroups', 'amount', data.count)
        this.entityTotalHostGroupStatsLoaded = true;
        this.updateStatsLoadedStatus();
      });
    }
  }
}
</script>
