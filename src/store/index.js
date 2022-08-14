import Vue from "vue";
import Vuex from "vuex";
import workspace from "./workspace";
import table from "./table";
import view from "./view";

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",
    state: {
        appFeedback: "",
        showFeedback: false,
        activeFieldOpt: null,
    },
    mutations: {
        setAppFeedback: (state, payload) => {
            state.appFeedback = payload;
            state.showFeedback = true;
        },
        setShowFeedback: (state, payload) => {
            state.showFeedback = payload;
        },
        setActiveFieldOpt: (state, payload) => {
            state.activeFieldOpt = payload;
        },
    },
    getters: {
        getAppFeedback: (state) => {
            return state.appFeedback;
        },
        shouldShowFeedback: (state) => {
            return state.showFeedback;
        },
        getActiveFieldOpt: (state) => {
            return state.activeFieldOpt;
        },
    },
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
