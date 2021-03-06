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
                <td>
                  <a v-bind:style="{color : item.textColor, 'font-weight': 'bold', 'font-size': '18px'}"
                     @click="$router.push(item.href)">
                    <u> {{ item.amount }} </u>
                  </a>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col cols=" 5">
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
                <td>
                  <a style="color: black; font-weight: bold; font-size: 18px"
                     @click="$router.push(item.href)">
                    <u> {{ item.amount }} </u>
                  </a>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
        <ReportsChart></ReportsChart>
    </v-row>
  </v-container>
</template>

<script>

import ViewHeader from "@/components/ViewHeader";
import jobbyApi from "@/services/jobbyApi";
import ReportsChart from "@/components/ReportsChart";


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
          textColor: 'green',
          href: 'reports/success',
          amount: 0,
        },
        {
          id: 'reports_count_failure',
          textColor: 'orange',
          href: 'reports/failure',
          name: 'Failure',
          amount: 0,
        },
        {
          id: 'reports_count_error',
          href: 'reports/error',
          textColor: 'darkred',
          name: 'Error',
          amount: 0,
        },
        {
          id: 'total_reports',
          textColor: 'black',
          href: 'reports/all',
          name: 'Total Reports',
          amount: 0,
        },
      ],
      entitySummary: [
        {
          id: 'total_jobs',
          name: 'Total Jobs',
          href: 'jobs/jobs',
          amount: 0,
        },
        {
          id: 'total_jobgroups',
          name: 'Total Jobgroups',
          href: 'jobs/jobgroups',
          amount: 0,
        },
        {
          id: 'total_hosts',
          name: 'Total Hosts',
          href: 'hosts/hosts',
          amount: 0,
        },
        {
          id: 'total_hostgroups',
          name: 'Total Hostgroups',
          href: 'hosts/hostgroups',
          amount: 0,
        },

      ],
    }
  },
  components: {ReportsChart, ViewHeader},
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
