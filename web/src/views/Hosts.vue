<template>
  <v-container>
    <h1 class="text-center">Host</h1>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>My Hosts</v-card-title>
          <v-simple-table fixed-header>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">Host</th>
                <th class="text-left">Description</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in hosts" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>
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

export default {
  name: 'Home',
  data() {
    return {
      hosts: [
        {
          name: 'Quving Production 0',
          description: 'Single K8s that has every task of Quving. :)',
        },
        {
          name: 'Quving Rancher Master',
          description: 'Rancher Master',
        },
        {
          name: 'Quving Storage',
          description: 'Backup Server',
        },
      ],
    }
  },
  components: {},
  watch: {},
  created() {
  },
  methods: {},
}
</script>
