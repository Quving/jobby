<template>
  <v-container>
    <h1 class="text-center">CREATE JOBGROUP</h1>
    <v-col>
      <v-text-field
          outlined
          counter=25
          hint="Select a good jobGroup name!"
          autofocus
          v-model="jobGroupName"
          label="JobGroup name">
      </v-text-field>
      <v-textarea
          outlined
          counter=100
          v-model="jobGroupDescription"
          label="JobGroup Description"
          hint="Your later self will be happy about a good description.">
      </v-textarea>
      <v-btn
          :loading="addBtnLoading"
          :disabled="false"
          color="success"
          @click="addJobGroup">
        Add JobGroup
      </v-btn>
    </v-col>
  </v-container>
</template>
<script>
export default {
  name: 'App',
  components: {},
  data: () => ({
    addBtnLoading: false,
    jobGroupName: "",
    jobGroupDescription: "",
  }),
  methods: {
    addJobGroup: function () {

    }
  }
};
</script>

