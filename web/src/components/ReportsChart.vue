<template>
  <v-container>
    <v-card :loading="isFetching">
      <v-card-title>
        {{ title }}
      </v-card-title>
      <line-chart
          :key="datasets.toString()"
          :title="title"
          :datasets="datasets"
          :labels="labels">
      </line-chart>
    </v-card>
  </v-container>
</template>
<script>
import {Line} from 'vue-chartjs'
import Vue from "vue";
import util from "@/services/util";
import jobbyApi from "@/services/jobbyApi";

Vue.component('line-chart', {
  extends: Line,
  props: {
    labels: Array,
    datasets: Array,
    title: String,
  },
  mounted() {
    this.renderChart({
      labels: this.labels,
      datasets: this.datasets,
    }, {responsive: true, maintainAspectRatio: false})
  }
})


export default {
  data() {
    return {
      pageSizeReport: 1000,

      // Status
      isFetching: false,

      // Chart
      title: "Reports History",
      labels: [],
      datasets: [],
      datasetsMeta: [
        {
          label: 'Total Reports',
          backgroundColor: 'lightgray',
          status: 'all'
        },
        {
          label: 'Success Reports',
          backgroundColor: 'green',
          status: 'success'
        },
        {
          label: 'Failure Reports',
          backgroundColor: 'orange',
          status: 'failure'
        },
        {
          label: 'Error Reports',
          backgroundColor: 'red',
          status: 'error'
        }
      ],
    }
  },
  mounted() {
    this.fetchData();
  }
  ,
  methods: {
    fetchData: async function () {

      this.isFetching = true;

      // Fetch all dataset for the last 30 days.
      let dataset = [];
      let dateFrom = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      let nextUrl = "placeholder";

      let urlParams = `?limit=100&createdAtSince=${dateFrom}`;
      while (nextUrl) {
        let data = await jobbyApi.listReports(urlParams);
        dataset = dataset.concat(data.results);
        if (!data.next) break;
        urlParams = `?${data.next.split('?')[1]}`;
      }

      // Start sorting and counting dataset to date and status.
      let last30Days = util.getAllDatesBetweenDates(
          new Date(new Date().setDate(new Date().getDate() - 29)),
          new Date()
      );
      this.labels = last30Days.map((value) => value.toISOString().split('T')[0]);
      for (let i = 0; i < this.datasetsMeta.length; i++) {
        let datasubset = []
        let metadata = this.datasetsMeta[i];
        for (let j = 0; j < this.labels.length; j++) {
          let date = this.labels[j];
          let count = (metadata.status === 'all') ?
              dataset.filter(x => (x.created_at.startsWith(date))).length :
              dataset.filter(x => (x.created_at.startsWith(date) && x.status === metadata.status)).length;
          datasubset.push(count);
        }
        // Update dataset to visualize.
        this.datasets.push(
            {
              label: metadata.label,
              backgroundColor: metadata.backgroundColor,
              data: datasubset
            });
      }
      this.isFetching = false;
    },
  }
}
</script>