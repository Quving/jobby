import axios from 'axios';
import store from '@/store/index';
import AuthService from "@/services/authService";

const config = require('@/config');

export default {
    makeAuthenticatedGetRequest(urlPath) {
        const jwtToken = store.getters.credentials.jwt_token;
        const headers = {
            "Content-type": "application/json",
            "accept": "application/json",
            "Authorization": `Bearer ${jwtToken}`
        };
        return new Promise((resolve, reject) => {
            axios.get(`${config.envs.apiHostUrl}${urlPath}`, {headers: headers})
                .then((response) => {
                    resolve(response.data);
                }, (error) => {
                    if (error.response.status === 401) {
                        AuthService.logout();
                    }
                    reject(error.response.data);
                })
        });
    },
    makeAuthenticatedPatchRequest(urlPath, data) {
        const jwtToken = store.getters.credentials.jwt_token;
        const url = `${config.envs.apiHostUrl}${urlPath}`;
        const headers = {
            "Content-type": "application/json",
            "accept": "application/json",
            "Authorization": `Bearer ${jwtToken}`
        };

        return new Promise((resolve, reject) => {
            axios.patch(url, data, {headers: headers})
                .then((response) => {
                    resolve(response.data);
                }, (error) => {
                    if (error.response.status === 401) {
                        AuthService.logout();
                    }
                    reject(error.response.data);
                })
        });
    },
    makeAuthenticatedPostRequest(urlPath, data) {
        const jwtToken = store.getters.credentials.jwt_token;
        const url = `${config.envs.apiHostUrl}${urlPath}`;
        const headers = {
            "Content-type": "application/json",
            "accept": "application/json",
            "Authorization": `Bearer ${jwtToken}`
        };

        return new Promise((resolve, reject) => {
            axios.post(url, data, {headers: headers})
                .then((response) => {
                    resolve(response.data);
                }, (error) => {
                    if (error.response.status === 401) {
                        AuthService.logout();
                    }
                    reject(error.response.data);
                })
        });
    },
    makeAuthenticatedDeleteRequest(urlPath) {
        const jwtToken = store.getters.credentials.jwt_token;
        const url = `${config.envs.apiHostUrl}${urlPath}`;
        const headers = {
            "Content-type": "application/json",
            "accept": "application/json",
            "Authorization": `Bearer ${jwtToken}`
        };

        return new Promise((resolve, reject) => {
            axios.delete(url, {headers: headers})
                .then((response) => {
                    resolve(response.data);
                }, (error) => {
                    if (error.response.status === 401) {
                        AuthService.logout();
                    }
                    reject(error.response.data);
                })
        });
    },
    createJob(data) {
        return this.makeAuthenticatedPostRequest('/resources/job/', data);
    },
    createHost(data,) {
        return this.makeAuthenticatedPostRequest('/resources/host/', data);
    },
    createHostGroup(data) {
        return this.makeAuthenticatedPostRequest('/resources/hostgroup/', data);
    },
    createJobGroup(data) {
        return this.makeAuthenticatedPostRequest('/resources/jobgroup/', data);
    },
    getJob(id) {
        return this.makeAuthenticatedGetRequest(`/resources/job/${id}/`);
    },
    getJobGroup(id) {
        return this.makeAuthenticatedGetRequest(`/resources/jobgroup/${id}/`);
    },
    getHost(id) {
        return this.makeAuthenticatedGetRequest(`/resources/host/${id}/`);
    },
    getHostGroup(id) {
        return this.makeAuthenticatedGetRequest(`/resources/hostgroup/${id}/`);
    },
    getReport(id) {
        return this.makeAuthenticatedGetRequest(`/resources/report/${id}/`);
    },
    deleteJob(id) {
        return this.makeAuthenticatedDeleteRequest(`/resources/job/${id}/`);
    },
    deleteJobGroup(id) {
        return this.makeAuthenticatedDeleteRequest(`/resources/jobgroup/${id}/`);
    },
    deleteHost(id) {
        return this.makeAuthenticatedDeleteRequest(`/resources/host/${id}/`);
    },
    deleteHostGroup(id) {
        return this.makeAuthenticatedDeleteRequest(`/resources/hostgroup/${id}/`);
    },
    deleteReport(id) {
        return this.makeAuthenticatedDeleteRequest(`/resources/report/${id}/`);
    },
    listJobs(urlParams) {
        return this.makeAuthenticatedGetRequest(`/resources/job/${urlParams}`);
    },
    listHosts(urlParams) {
        return this.makeAuthenticatedGetRequest(`/resources/host/${urlParams}`);
    },
    listHostGroups(urlParams) {
        return this.makeAuthenticatedGetRequest(`/resources/hostgroup/${urlParams}`);
    },
    listJobGroups(urlParams) {
        return this.makeAuthenticatedGetRequest(`/resources/jobgroup/${urlParams}`);
    },
    listReports(urlParams) {
        return this.makeAuthenticatedGetRequest(`/resources/report/${urlParams}`);
    },
    updateJob(id, data) {
        return this.makeAuthenticatedPatchRequest(`/resources/job/${id}/`, data);
    },
    updateHost(id, data) {
        return this.makeAuthenticatedPatchRequest(`/resources/host/${id}/`, data);
    },
    updateHostGroup(id, data) {
        return this.makeAuthenticatedPatchRequest(`/resources/hostgroup/${id}/`, data);
    },
    updateJobGroup(id, data) {
        return this.makeAuthenticatedPatchRequest(`/resources/jobgroup/${id}/`, data);
    },
    updateReport(id, data) {
        return this.makeAuthenticatedPatchRequest(`/resources/report/${id}/`, data);
    },
}
