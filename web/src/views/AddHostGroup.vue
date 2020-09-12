<template>
  <v-container>
    <h1 class="text-center">CREATE HOSTGROUP</h1>
    <v-col>
      <v-text-field
          outlined
          counter=25
          hint="Select a good hostGroup name!"
          autofocus
          v-model="hostGroupName"
          label="HostGroup name">
      </v-text-field>
      <v-textarea
          outlined
          counter=100
          v-model="hostGroupDescription"
          label="HostGroup Description"
          hint="Your later self will be happy about a good description.">
      </v-textarea>
      <v-btn
          :loading="addBtnLoading"
          :disabled="false"
          color="success"
          @click="addHostGroup">
        Add HostGroup
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
    hostGroupName: "",
    hostGroupDescription: "",
  }),
  methods: {
    addHostGroup: function () {

    }
  }
};
</script>

