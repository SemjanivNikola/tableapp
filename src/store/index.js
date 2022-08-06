import Vue from "vue";
import Vuex from "vuex";
import workspace from "./workspace";
import table from "./table";
import view from "./view";

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
        table: {
            namespaced: true,
            ...table,
        },
        view: {
            namespaced: true,
            ...view,
        },
    },
});
