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
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        }
    },
    actions: {
        async register({commit}, {username, email, password}) {
            try {
                const response = await axios.post("http://localhost:8000/api/register", {
                    username, email, password
                });
                commit("setUser", response.data.user);
            } catch (error) {
                console.error(error);
            }
        },
        async login({commit}, {email, password, remember}) {
            try {
                const response = await axios.post("/api/login", {
                    email, password, remember
                });
                commit("setUser", response.data.user);
            } catch (error) {
                console.error(error);
            }
        },
        async logout({commit}) {
            try {
                await axios.post("/api/logout");
                commit("setUser", null);
            } catch (error) {
                console.error(error);
            }
        }
    },
    getters: {
        isAuthenticated: state => !!state.user
    }
});
