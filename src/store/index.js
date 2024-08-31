import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // user: {
        //     username: "admin",
        //     email: "admin@admin.com"
        // }
        user: null
    }, mutations: {
        setUser(state, user) {
            state.user = user;
        }
    }, actions: {
        async register({commit}, {username, email, password}) {
            try {
                const response = await axios.post("http://localhost:8000/user/register", {
                    username, email, password
                });
                commit("setUser", response.data.user);
            } catch (error) {
                console.error(error);
            }
        }, async login({commit}, {email, password, remember}) {
            try {
                const response = await axios.post("http://localhost:8000/user/login", {
                    email, password, remember
                });
                axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
                commit("setUser", response.data.user);
            } catch (error) {
                console.error(error);
            }
        }, async logout({commit}) {
            try {
                await axios.post("http://localhost:8000/user/logout", {});
                delete axios.defaults.headers.common["Authorization"];
                commit("setUser", null);
            } catch (error) {
                console.error(error);
            }
        },
    },

    getters: {
        isAuthenticated: state => !!state.user
    }
});
