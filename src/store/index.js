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
        structureOpen: true,
        activeCellCoordinates: [],
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
        toggleStructureOpen: (state) => {
            state.structureOpen = !state.structureOpen;
        },
        updateCellCoordinates: (state, payload) => {
            if (payload.type === "cell") {
                state.activeCellCoordinates[1] = payload.index;
            } else {
                state.activeCellCoordinates[0] = payload.index;
            }
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
        isStructureOpen: (state) => {
            return state.structureOpen;
        },
        getActiveCellCoordinates: (state) => {
            return state.activeCellCoordinates;
        },
    },
    actions: {
        handleActiveFieldOpt ({ commit, state }, payload) {
            if (payload === state.activeFieldOpt) {
                commit("setActiveFieldOpt", null);
            } else {
                commit("setActiveFieldOpt", payload);
            }
        },
    },
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
