<template>
  <v-container>
    <view-headers :header="headerText"></view-headers>
    <v-row justify="center">
      <v-col cols="6">
        <form @submit.prevent="submit" autocomplete="on">
          <h2 class="mb-5 text-center">Metadata</h2>
          <h3 class="form-header">Name</h3>
          <v-text-field
              :readonly="formReadOnly"
              required
              outlined
              counter=100
              hint="Select a good report name!"
              v-model="reportName"
              :persistent-hint="persistentHint"
              label="Report name">
          </v-text-field>
          <h3 class="form-header">Created At</h3>
          <v-text-field
              :readonly="formReadOnly"
              required
              outlined
              counter=25
              v-model="reportCreatedAt"
              :persistent-hint="persistentHint"
              label="Status"
              hint="Job Status (success, warning, error, undefined)">
          </v-text-field>
          <h3 class="form-header">Status</h3>
          <v-text-field
              :readonly="formReadOnly"
              required
              outlined
              counter=25
              v-model="reportStatus"
              :persistent-hint="persistentHint"
              label="Status"
              hint="Job Status (success, warning, error, undefined)">
          </v-text-field>
          <h3 class="form-header">Job</h3>
          <v-select
              v-if="!formReadOnly"
              outlined
              :items="jobs"
              v-model="selectedReportJob"
              item-text="name"
              item-value="id"
              :menu-props="{ maxHeight: '400', maxWidth:'200' }"
              label="jobs"
              hint="The Job this Report belongs to"
              :persistent-hint="persistentHint"
          ></v-select>
          <v-text-field
              v-else
              :readonly="formReadOnly"
              required
              outlined
              v-model="selectedReportJob"
              :menu-props="{ maxHeight: '400', maxWidth:'200' }"
              label="Job"
              hint="The job this report is referring to."
              :persistent-hint="persistentHint"
          ></v-text-field>
          <v-alert class="mt-5 mb-5" dense v-if='status' v-bind:type="alert_type">{{ status }}</v-alert>
          <v-btn
              :loading="submitBtnLoading"
              :color="submitBtnColor"
              v-if="action !== 'read'"
              type="submit">
            {{ submitBtnText }}
          </v-btn>
        </form>
      </v-col>
      <v-col>
        <h2 class="mb-5 text-center">Logs</h2>
        <h3 class="form-header">Logs</h3>
        <v-textarea
            :readonly="formReadOnly"
            required
            outlined
            counter=10000
            v-model="reportLogs"
            rows="25"
            label="Log"
            :persistent-hint="persistentHint"
            hint="Job Log">
        </v-textarea>
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
      // Url Params
      id: this.$route.params.id,
      action: this.$route.params.action,

      // Site
      headerText: "",

      // Form
      submitBtnLoading: false,
      formIsValid: false,
      formReadOnly: false,
      jobs: [],
      reportCreatedAt: "",
      reportName: "",
      reportStatus: "",
      reportLogs: "",
      reportJob: "",
      persistentHint: true,
      selectedReportJob: undefined,
      submitBtnColor: "",
      submitBtnText: "",

      // Status
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
          headerText: "Add Report",
          submitBtnText: "Add Report"
        },
        read: {
          fetchObjectOfInterest: true,
          formReadOnly: true,
          submitBtnColor: "warning",
          headerText: "View Report",
          submitBtnText: "Update"
        },
        update: {
          fetchObjectOfInterest: true,
          formReadOnly: false,
          submitBtnColor: "warning",
          headerText: "Update Report",
          submitBtnText: "Update"
        },
        delete: {
          fetchObjectOfInterest: true,
          formReadOnly: true,
          submitBtnColor: "error",
          headerText: "Delete Report",
          submitBtnText: "Delete"
        },
      };
      const dynamicVariables = dynamicActionVars[this.action];
      this.formReadOnly = dynamicVariables.formReadOnly;
      this.submitBtnText = dynamicVariables.submitBtnText;
      this.headerText = dynamicVariables.headerText;
      this.submitBtnColor = dynamicVariables.submitBtnColor;

      // Fetch reportgroups. It's required on every action.
      JobbyApi.listJobs().then(data => {
        this.jobs = data;
      }, error => {
        console.log(error);
      });
      if (dynamicVariables.fetchObjectOfInterest) {
        JobbyApi.getReport(this.id).then(data => {
          this.reportName = data.name;
          this.reportDescription = data.description;
          this.reportCreatedAt = new Date(data.created_at).toLocaleString();
          this.reportStatus = data.status;
          this.reportLogs = data.logs;

          this.selectedReportJob = (dynamicVariables.formReadOnly) ? data.job_detailed.name : data.job_detailed.id;
        });
      }
    },
    createReport: function () {
      this.submitBtnLoading = true;
      const data = {
        name: this.reportName,
        os: this.reportOS,
        reportgroup: this.selectedReportGroupId,
        description: this.reportDescription
      };

      // eslint-disable-next-line no-unused-vars
      JobbyApi.createReport(data).then((response) => {
        this.alert_type = 'success';
        this.status = 'Report has been created.';
        this.submitBtnLoading = false;
      }, (error) => {
        this.alert_type = 'error';
        this.status = 'Report could not be created.';
        for (const [key, value] of Object.entries(error)) {
          this.status += `${status}\n ${key.toUpperCase()}: ${value}`;
        }
      });

    },
    updateReport: function () {
      this.submitBtnLoading = true;
      const data = {
        name: this.reportName,
        job: this.selectedReportJob,
        status: this.reportStatus,
        logs: this.reportLogs,
      };

      // eslint-disable-next-line no-unused-vars
      JobbyApi.updateReport(this.id, data).then((response) => {
        this.alert_type = 'success';
        this.status = 'Report updated.';
        this.submitBtnLoading = false;
        setTimeout(() => {
          this.$router.push("/reports");
        }, 1000);

      }, (error) => {
        console.log(error);
        this.alert_type = 'error';
        this.status = 'Report could not be updated.';
        for (const [key, value] of Object.entries(error)) {
          this.status += `${status}\n ${key.toUpperCase()}: ${value}`;
        }
        this.submitBtnLoading = false;
      });
    },
    deleteReport: function () {
      this.submitBtnLoading = true;

      // eslint-disable-next-line no-unused-vars
      JobbyApi.deleteReport(this.id).then((response) => {
        this.alert_type = 'success';
        this.status = 'Report deleted. You will be redirected back in a few seconds.';
        this.submitBtnLoading = false;

        setTimeout(() => {
          this.$router.push("/reports");
        }, 1000);
      }, (error) => {
        console.log(error);
        this.alert_type = 'error';
        this.status = 'Report could not be deleted.';
        for (const [key, value] of Object.entries(error)) {
          this.status += `${status}\n ${key.toUpperCase()}: ${value}`;
        }
        this.submitBtnLoading = false;
      });
    },
    submit: function () {
      const funcs = {
        update: this.updateReport,
        delete: this.deleteReport,
      };
      funcs[this.action]();
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
