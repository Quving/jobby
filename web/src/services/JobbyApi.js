import axios from 'axios';
import store from '@/store/index';
import AuthService from "@/services/AuthService";

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
    listJobs() {
        return this.makeAuthenticatedGetRequest('/resources/job/');
    },
    listHosts() {
        return this.makeAuthenticatedGetRequest('/resources/hosts/');
    },
    listHostGroups() {
        return this.makeAuthenticatedGetRequest('/resources/hostgroup/');
    },
    listJobGroups() {
        return this.makeAuthenticatedGetRequest('/resources/jobgroup');
    }
}
