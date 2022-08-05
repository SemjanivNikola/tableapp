import Vue from "vue";
import Vuex from "vuex";
import workspace from "./workspace";

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",
    state: {},
    mutations: {},
    actions: {},
    modules: {
        workspace: {
            namespaced: true,
            ...workspace,
        },
    },
});
