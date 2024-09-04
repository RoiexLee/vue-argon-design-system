import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        accessToken: null
    }, getters: {
        isAuthenticated: state => state.accessToken !== null
    }, actions: {
        logout() {
            this.$store.state.accessToken = null
        }
    }
});
