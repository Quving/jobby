<template>
  <v-container>
    <view-headers :header="headerText"></view-headers>
    <v-row justify="center">
      <v-col cols="6">
        <form @submit.prevent="submit" autocomplete="on">
          <h2 class="mb-5 text-center">Properties</h2>
          <h3 class="form-header">Name</h3>
          <v-text-field
              :readonly="formReadOnly"
              required
              outlined
              counter=25
              hint="Select a good jobGroup name!"
              v-model="jobGroupName"
              :persistent-hint="persistentHint"
              label="JobGroup name">
          </v-text-field>
          <h3 class="form-header">Description</h3>
          <v-textarea
              :readonly="formReadOnly"
              required
              outlined
              counter=100
              v-model="jobGroupDescription"
              label="JobGroup Description"
              :persistent-hint="persistentHint"
              hint="Your later self will be happy about a good description.">
          </v-textarea>
          <v-alert class="mt-5 mb-5" dense v-if='status' v-bind:type="alert_type">{{ status }}</v-alert>
          <v-btn
              v-if="action !== 'read'"
              :loading="submitBtnLoading"
              :disabled="false"
              type="submit"
              :color="submitBtnColor">
            {{ submitBtnText }}
          </v-btn>
        </form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import JobbyApi from "@/services/jobbyApi";
import ViewHeaders from "@/components/ViewHeader";

export default {
  name: 'App',
  components: {ViewHeaders},
  data() {
    return {
      // Other
      id: this.$route.params.id,
      action: this.$route.params.action,

      // Form
      formReadOnly: true,
      jobGroupName: "",
      jobGroupDescription: "",
      persistentHint: true,
      submitBtnColor: "",
      submitBtnLoading: false,
      submitBtnText: "",

      // Site
      headerText: "",

      // Status Bar
      alert_type: "",
      status: "",
    }
  },
  created() {
    this.initState();
  },
  methods: {
    initState: function () {
      const dynamicActionVars = {
        create: {
          fetchObjectOfInterest: false,
          formReadOnly: false,
          submitBtnColor: "success",
          headerText: "Add JobGroup",
          submitBtnText: "Add JobGroup"
        },
        read: {
          fetchObjectOfInterest: true,
          formReadOnly: true,
          submitBtnColor: "warning",
          headerText: "View JobGroup",
          submitBtnText: "Update"
        },
        update: {
          fetchObjectOfInterest: true,
          formReadOnly: false,
          submitBtnColor: "warning",
          headerText: "Update JobGroup",
          submitBtnText: "Update"
        },
        delete: {
          fetchObjectOfInterest: true,
          formReadOnly: true,
          submitBtnColor: "error",
          headerText: "Delete JobGroup",
          submitBtnText: "Delete"
        },
      };
      const dynamicVariables = dynamicActionVars[this.action];
      this.formReadOnly = dynamicVariables.formReadOnly;
      this.submitBtnText = dynamicVariables.submitBtnText;
      this.headerText = dynamicVariables.headerText;
      this.submitBtnColor = dynamicVariables.submitBtnColor;

      if (dynamicVariables.fetchObjectOfInterest) {
        JobbyApi.getJobGroup(this.id).then(data => {
          this.jobGroupName = data.name;
          this.jobGroupDescription = data.description;
        });
      }
    },
    createJobGroup: function () {
      this.submitBtnLoading = true;
      const data = {
        name: this.jobGroupName,
        description: this.jobGroupDescription
      };

      // eslint-disable-next-line no-unused-vars
      JobbyApi.createJobGroup(data).then((response) => {
        this.alert_type = 'success';
        this.status = 'JobGroup created.';
        this.submitBtnLoading = false;
      }, (error) => {
        this.alert_type = 'error';
        this.status = 'JobGroup could not be created.';
        for (const [key, value] of Object.entries(error)) {
          this.status += `${status}\n ${key.toUpperCase()}: ${value}`;
        }
        this.submitBtnLoading = false;
      });
    },
    updateJobGroup: function () {
      this.submitBtnLoading = true;
      const data = {
        name: this.jobGroupName,
        description: this.jobGroupDescription
      };

      // eslint-disable-next-line no-unused-vars
      JobbyApi.updateJobGroup(this.id, data).then((response) => {
        this.alert_type = 'success';
        this.status = 'JobGroup updated.';
        this.submitBtnLoading = false;
      }, (error) => {
        this.alert_type = 'error';
        this.status = 'JobGroup could not be updated.';
        for (const [key, value] of Object.entries(error)) {
          this.status += `${status}\n ${key.toUpperCase()}: ${value}`;
        }
        this.submitBtnLoading = false;
      });
    },
    deleteJobGroup: function () {
      this.submitBtnLoading = true;
      // eslint-disable-next-line no-unused-vars
      JobbyApi.deleteJobGroup(this.id).then((response) => {
        this.alert_type = 'success';
        this.status = 'JobGroup deleted. You will be redirected back in a few seconds.';
        this.submitBtnLoading = false;
      }, (error) => {
        console.log(error);
        this.alert_type = 'error';
        this.status = 'JobGroup could not be deleted.';
        for (const [key, value] of Object.entries(error)) {
          this.status += `${status}\n ${key.toUpperCase()}: ${value}`;
        }
        this.submitBtnLoading = false;
      });
    },
    submit: function () {
      const actionFunctions = {
        create: this.createJobGroup,
        update: this.updateJobGroup,
        delete: this.deleteJobGroup,
      };
      actionFunctions[this.action]();
      setTimeout(() => {
        this.$router.push("/jobs");
      }, 1000);
    }
  }
};
</script>
<style>
.form-header {
  margin-top: 5mm;
  margin-bottom: 3mm;
}

</style>
