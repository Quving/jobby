// src/store.js
import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
export default new Vuex.Store({
    strict: true,
    plugins: [createPersistedState()],
    state: {
        credentials: null,
    },
    getters: {
        isAuthenticated(state) {
            return state.credentials !== null;
        },
        credentials(state) {
            return state.credentials;
        },
        userHomePreferences(state) {
            return state.homePreferences;
        }
    },
    mutations: {
        authUser(state, userData) {
            state.credentials = userData.credentials;
        },
        clearUserData(state) {
            state.credentials = null;
        }

    },
    actions: {
        login: ({commit}, data) => {
            commit('authUser', {
                credentials: data.credentials,
            });
        },
        logout: ({commit}) => {
            commit('clearUserData');
        }
    }
});
