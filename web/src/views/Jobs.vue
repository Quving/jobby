<template>
  <v-container>
    <h1 class="text-center">JOBS</h1>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>My Jobs</v-card-title>
          <v-simple-table fixed-header>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">Job</th>
                <th class="text-left">Description</th>
                <th class="text-left">Host</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in jobs" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.host }}</td>
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
      jobs: [
        {
          name: 'Borgbackup Quving-production-server',
          description: 'A borgbackup will be created.',
          host: 'Quving-Production-server'
        },
        {
          name: 'Gitlab Pruning Script',
          description: 'At this task, the gitlab-registry will be pruned.',
          host: 'git.hoou.tech'
        },
        {
          name: 'Apt Update, apt upgrade',
          description: 'Autoupdate all package to latest.',
          host: 'Quving.Rancher-Master'
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
