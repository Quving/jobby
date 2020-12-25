<template>
  <v-container>
    <view-headers :header="headerText"></view-headers>
    <v-row>
      <v-col>
        <form @submit.prevent="submit" autocomplete="on">
          <h2 class="mb-5 text-center">Properties</h2>
          <h3 class="form-header">Name</h3>
          <v-text-field
              :readonly="formReadOnly"
              required
              outlined
              counter=25
              hint="Select a good job name!"
              v-model="jobName"
              :persistent-hint="persistentHint"
              label="Job name">
          </v-text-field>
          <h3 class="form-header">Description</h3>
          <v-textarea
              :readonly="formReadOnly"
              required
              outlined
              counter=100
              v-model="jobDescription"
              label="Job Description"
              :persistent-hint="persistentHint"
              hint="Your later self will be happy about a good description.">
          </v-textarea>
          <h3 class="form-header">JobGroup</h3>
          <v-select
              v-if="!formReadOnly"
              outlined
              v-model="selectedJobGroup"
              :items="jobGroups"
              :menu-props="{ maxHeight: '400', maxWidth:'200' }"
              item-text="name"
              item-value="id"
              label="JobGroup"
              hint="Select JobGroup"
              :persistent-hint="persistentHint"
          ></v-select>
          <v-text-field
              v-else
              :readonly="formReadOnly"
              required
              outlined
              v-model="selectedJobGroup"
              label="JobGroup"
              hint="Select JobGroup"
              :persistent-hint="persistentHint"
          ></v-text-field>
          <h3 class="form-header">Host</h3>
          <v-select
              v-if="!formReadOnly"
              outlined
              v-model="selectedHost"
              item-text="name"
              item-value="id"
              :items="hosts"
              :menu-props="{ maxHeight: '400', maxWidth:'200' }"
              label="Host"
              hint="Select Host"
              :persistent-hint="persistentHint"
          ></v-select>
          <v-text-field
              v-else
              :readonly="formReadOnly"
              required
              outlined
              v-model="selectedHost"
              label="Host"
              hint="Select Host"
              :persistent-hint="persistentHint"
          ></v-text-field>
          <v-alert class="mt-5 mb-5" dense v-if='status' v-bind:type="alert_type">{{ status }}</v-alert>
          <v-btn
              :loading="submitBtnLoading"
              :disabled="false"
              :color="submitBtnColor"
              v-if="action !== 'read'"
              type="submit">
            {{ submitBtnText }}
          </v-btn>
        </form>
      </v-col>
      <v-col>
        <h2 class="mb-5 text-center">Generated Snippets</h2>
        <h3 class="form-header">Bash (curl)</h3>
        <v-textarea
            style="font-family: monospace"
            :disabled="action === 'create'"
            readonly
            required
            outlined
            v-model="curlCommand"
            rows="7"
            label="Snippet"
            hint="Copy this command to your shell-script (e.g. Cronjob) and replace STATUS, LOGS and NAME with your values."
            persistent-hint
        ></v-textarea>
        <h3 class="form-header">Python (requests)</h3>
        <v-textarea
            style="font-family: monospace"
            :disabled="action === 'create'"
            readonly
            required
            outlined
            rows="10"
            v-model="pythonCommand"
            label="Snippet"
            hint="Copy this command to your python-script and replace STATUS, LOGS and NAME with your values."
            persistent-hint
        ></v-textarea>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import JobbyApi from "@/services/jobbyApi";
import ViewHeaders from "@/components/ViewHeader";
import util from "@/services/util";

export default {
  name: 'App',
  components: {ViewHeaders},
  data() {
    return {
      // Url Params
      id: this.$route.params.id,
      action: this.$route.params.action,

      // Site
      headerText: "",

      // Form
      curlCommand: "",
      pythonCommand: "",
      jobName: "",
      jobDescription: "",
      formReadOnly: false,
      jobGroups: [],
      hosts: [],
      persistentHint: true,
      selectedJobGroup: 0,
      selectedHost: 0,
      submitBtnText: "",
      submitBtnLoading: false,
      submitBtnColor: "",

      // Status bar
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
          headerText: "Add Job",
          submitBtnText: "Add Job"
        },
        read: {
          fetchObjectOfInterest: true,
          formReadOnly: true,
          submitBtnColor: "warning",
          headerText: "View Job",
          submitBtnText: "Update"
        },
        update: {
          fetchObjectOfInterest: true,
          formReadOnly: false,
          submitBtnColor: "warning",
          headerText: "Update Job",
          submitBtnText: "Update"
        },
        delete: {
          fetchObjectOfInterest: true,
          formReadOnly: true,
          submitBtnColor: "error",
          headerText: "Delete Job",
          submitBtnText: "Delete"
        },
      };
      const dynamicVariables = dynamicActionVars[this.action];
      this.formReadOnly = dynamicVariables.formReadOnly;
      this.submitBtnText = dynamicVariables.submitBtnText;
      this.headerText = dynamicVariables.headerText;
      this.submitBtnColor = dynamicVariables.submitBtnColor;

      // Fetch the host-list and also the jobgroups. They're required for every action.
      JobbyApi.listHosts("?limit=250").then(data => {
        this.hosts = data.results;
      }, (error => {
        console.log(error)
      }));
      JobbyApi.listJobGroups("?limit=250").then(data => {
        this.jobGroups = data.results;
      }, (error => {
        console.log(error)
      }));

      // Fetch the object of interest specified by the url-params.
      if (dynamicVariables.fetchObjectOfInterest) {
        JobbyApi.getJob(this.id).then(data => {
          this.jobName = data.name;
          this.jobDescription = data.description;
          const token = (data.auth_token === '') ? '<token not available>' : data.auth_token;
          this.curlCommand = util.createCurlCommand(token, data.id);
          this.pythonCommand = util.createPythonCommand(token, data.id);

          // Fill v-textfield or v-select depending on field formReadOnly
          this.selectedJobGroup = (dynamicVariables.formReadOnly) ? data.jobgroup_detailed.name : data.jobgroup_detailed.id;
          this.selectedHost = (dynamicVariables.formReadOnly) ? data.host_detailed.name : data.host_detailed.id;
        });
      }
    },
    createJob: function () {
      this.submitBtnLoading = true;

      const data = {
        name: this.jobName,
        jobgroup: this.selectedJobGroup,
        host: this.selectedHost,
        description: this.jobDescription
      };

      JobbyApi.createJob(data).then((data) => {
        this.alert_type = 'success';
        this.status = 'Job created.';
        const token = (data.auth_token === '') ? '<token not available>' : data.auth_token;
        this.curlCommand = util.createCurlCommand(token, data.id);
        this.pythonCommand = util.createPythonCommand(token, data.id);
        this.submitBtnLoading = false;
      }, (error) => {
        this.alert_type = 'error';
        this.status = 'Job could not be created.';
        for (const [key, value] of Object.entries(error)) {
          this.status += `${status}\n ${key.toUpperCase()}: ${value}`;
        }
        this.submitBtnLoading = false;
      });
    },
    updateJob: function () {
      this.submitBtnLoading = true;
      const data = {
        name: this.jobName,
        jobgroup: this.selectedJobGroup,
        host: this.selectedHost,
        description: this.jobDescription
      };

      // eslint-disable-next-line no-unused-vars
      JobbyApi.updateJob(this.id, data).then((response) => {
        this.alert_type = 'success';
        this.status = 'Job updated.';
        this.submitBtnLoading = false;
        setTimeout(() => {
          this.$router.push("/jobs/jobs");
        }, 1000);
      }, (error) => {
        console.log(error);
        this.alert_type = 'error';
        this.status = 'Job could not be updated.';
        for (const [key, value] of Object.entries(error)) {
          this.status += `${status}\n ${key.toUpperCase()}: ${value}`;
        }
        this.submitBtnLoading = false;
      });
    },
    deleteJob: function () {
      this.submitBtnLoading = true;

      // eslint-disable-next-line no-unused-vars
      JobbyApi.deleteJob(this.id).then((response) => {
        this.alert_type = 'success';
        this.status = 'Job deleted. You will be redirected back in a few seconds.';
        this.submitBtnLoading = false;

        setTimeout(() => {
          this.$router.push("/jobs/jobs");
        }, 1000);
      }, (error) => {
        console.log(error);
        this.alert_type = 'error';
        this.status = 'Job could not be deleted.';
        for (const [key, value] of Object.entries(error)) {
          this.status += `${status}\n ${key.toUpperCase()}: ${value}`;
        }
        this.submitBtnLoading = false;
      });
    },
    submit: function () {
      const funcs = {
        create: this.createJob,
        update: this.updateJob,
        delete: this.deleteJob,
      };
      funcs[this.action]();
    }
  }
}
</script>
<style>
.form-header {
  margin-top: 5mm;
  margin-bottom: 3mm;
}

</style>
