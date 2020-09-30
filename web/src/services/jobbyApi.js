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
    deleteJob(id) {
        return this.makeAuthenticatedPostRequest(`/resources/job/${id}/`);
    },
    deleteJobGroup(id) {
        return this.makeAuthenticatedPostRequest(`/resources/jobgroup/${id}/`);
    },
    deleteHost(id) {
        return this.makeAuthenticatedPostRequest(`/resources/host/${id}/`);
    },
    deleteHostGroup(id) {
        return this.makeAuthenticatedPostRequest(`/resources/hostgroup/${id}/`);
    },
    listJobs() {
        return this.makeAuthenticatedGetRequest('/resources/job/');
    },
    listHosts() {
        return this.makeAuthenticatedGetRequest('/resources/host/');
    },
    listHostGroups() {
        return this.makeAuthenticatedGetRequest('/resources/hostgroup/');
    },
    listJobGroups() {
        return this.makeAuthenticatedGetRequest('/resources/jobgroup/');
    }
}
