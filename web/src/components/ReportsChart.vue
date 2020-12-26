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
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData: async function () {
      this.isFetching = true;
      let last30Days = util.getAllDatesBetweenDates(
          new Date(new Date().setDate(new Date().getDate() - 29)),
          new Date()
      );
      this.labels = last30Days.map((value) => value.toISOString().split('T')[0]);
      let dataPoints = []
      for (let i = 0; i < this.labels.length; i++) {
        const date = this.labels[i];
        const urlParams = `?limit=100&createdAt=${date}`;
        const data = await jobbyApi.listReports(urlParams);
        dataPoints.push(data.count);
      }
      this.datasets = [
        {
          label: 'Data One',
          backgroundColor: 'darkcyan',
          data: dataPoints
        }
      ];
      this.isFetching = false;
    }
  }
}
</script>