<template>
  <v-container>
    <v-card>
      <v-card-title>
        {{ title }}
      </v-card-title>
      <line-chart
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
      title: "Reports History",
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 39, 10, 40, 39, 80, 40]
        }
      ]
    }
  },
}
</script>