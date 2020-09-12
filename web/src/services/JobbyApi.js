import axios from 'axios';
import store from '@/store/index';
import AuthService from "@/services/AuthService";

const config = require('@/config');

export default {
    listJobs() {
        const jwtToken = store.getters.credentials.jwt_token;
        const headers = {
            "Content-type": "application/json",
            "accept": "application/json",
            "Authorization": `Bearer ${jwtToken}`
        };
        return new Promise((resolve, reject) => {
            axios.get(`${config.envs.apiHostUrl}/resources/job/`, {headers: headers})
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
    listHosts() {
        const jwtToken = store.getters.credentials.jwt_token;
        const headers = {
            "Content-type": "application/json",
            "accept": "application/json",
            "Authorization": `Bearer ${jwtToken}`
        };
        return new Promise((resolve, reject) => {
            axios.get(`${config.envs.apiHostUrl}/resources/host/`, {headers: headers})
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
    listHostGroups() {
        const jwtToken = store.getters.credentials.jwt_token;
        const headers = {
            "Content-type": "application/json",
            "accept": "application/json",
            "Authorization": `Bearer ${jwtToken}`
        };
        return new Promise((resolve, reject) => {
            axios.get(`${config.envs.apiHostUrl}/resources/hostgroup/`, {headers: headers})
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
    listJobGroups() {
        const jwtToken = store.getters.credentials.jwt_token;
        const headers = {
            "Content-type": "application/json",
            "accept": "application/json",
            "Authorization": `Bearer ${jwtToken}`
        };
        return new Promise((resolve, reject) => {
            axios.get(`${config.envs.apiHostUrl}/resources/jobgroup/`, {headers: headers})
                .then((response) => {
                    resolve(response.data);
                }, (error) => {
                    if (error.response.status === 401) {
                        AuthService.logout();
                    }
                    reject(error.response.data);
                })
        });
    }
}
