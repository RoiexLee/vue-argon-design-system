import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        accessToken: null
    }, getters: {
        isAuthenticated: state => state.accessToken !== null
    }, mutations: {
        SET_ACCESS_TOKEN(state, accessToken) {
            state.accessToken = accessToken;
        }, CLEAR_ACCESS_TOKEN(state) {
            state.accessToken = null;
        }
    }
});
