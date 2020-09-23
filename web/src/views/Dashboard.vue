<template>
  <v-container>
    <view-header header="Dashboard"></view-header>
    <v-row>
      <v-col>
        <v-card>
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
      <v-col>
        <v-card>
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

export default {
  name: 'Home',
  data() {
    return {
      reportsSummary: [
        {
          name: 'Successful Reports',
          amount: 237,
        },
        {
          name: 'Failed Reports',
          amount: 15,
        },
        {
          name: 'Missing Reports',
          amount: 2,
        },
      ],
      entitySummary: [
        {
          name: 'Total Jobs',
          amount: 25,
        },
        {
          name: 'Total Hosts',
          amount: 9,
        },
        {
          name: 'Missing Reports',
          amount: 2,
        },
      ]
    }
  },
  components: {ViewHeader},
  watch: {},
  created() {
  },
  methods: {},
}
</script>
