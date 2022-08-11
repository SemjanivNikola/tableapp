import axios from "axios";
import gridOptions from "./gridOptions";

/**
 * NOTE: We don't need to read list from API, because we get it from workspace.
 */
export default {
    state: {
        view: null,
        recordList: [],
    },
    mutations: {
        setSelected (state, payload) {
            state.view = payload;
        },
        setRecordList (state, payload) {
            state.recordList = payload;
        },
        setMap (state, payload) {
            if (state.length > 0) {
                state.map.length = 0;
            }

            state.map = payload;
        },
        toggleFieldVisibility (state, payload) {
            state.view.header[payload.index].isShown = payload.isShown;

            state.view.body.forEach((row) => {
                row.cells[payload.index + 1].isShown = payload.isShown;
            });

            state.recordList.forEach((row) => {
                row.cells[payload.index + 1].isShown = payload.isShown;
            });

        },
    },
    getters: {
        getHeader: (state) => {
            return state.view.header;
        },
        isViewSelected: (state) => (id) => {
            return id === state.view.id;
        },
    },
    actions: {

        /*
         * TODO: How to read correct view, if every table within it's own view_list has items id start form 1?
         * Do we need to pass workspace id and table id as well?
         */
        readView ({ commit }, payload) {
            return axios.get(`/view?id=${payload}`).then((res) => {
                const { options, ...otherprops } = res.data;

                commit("setSelected", otherprops);
                commit("options/set", options, { root: false });
                return res.data;
            }).
                catch((err) => {
                    console.warn("Error > ", err);
                    throw err;
                });
        },
        createView ({ commit }, payload) {
            return axios.post("/view", payload).then((res) => {
                commit("table/addNewView", res.data, { root: true });
                commit("setAppFeedback", "View created successfully", { root: true });
                return true;
            }).
                catch((err) => {
                    commit("setAppFeedback", `Error:  ${err}`, { root: true });
                    return true;
                });
        },
        async handleBodyModification ({ state, commit, dispatch }) {
            const viewClone = await dispatch("options/modifyBody", state.view);
            commit("setRecordList", viewClone.body);
            return true;
        },
        handleHideFields ({ state, commit, dispatch }, payload) {
            if (state.view.header[payload].isShown) {
                commit("toggleFieldVisibility", { index: payload, isShown: false });
                dispatch("options/handleFieldVisibility", "add", { root: false });
            } else {
                commit("toggleFieldVisibility", { index: payload, isShown: true });
                dispatch("options/handleFieldVisibility", "subtract", { root: false });
            }
        },
        async handleSort ({ state, commit, dispatch }, payload) {
            commit("options/setSort", payload, { root: false });
            await dispatch("options/sortFields", { header: state.view.header, body: state.recordList },
                { root: false });
        },
        async handleFilter ({ state, commit, dispatch }, payload) {
            commit("options/setFilter", payload, { root: false });
            const clone = await dispatch("options/filterRecords", { header: state.view.header, body: state.view.body },
                { root: false });
            await dispatch("options/sortFields", { header: state.view.header, body: clone },
                { root: false });
            commit("setRecordList", clone);
        },
        async handleSortOptionRemove ({ state, dispatch }, payload) {
            const shouldSort = await dispatch("options/sortOptionRemove", payload, { root: false });
            if (shouldSort) {
                dispatch("options/sortFields", { header: state.view.header, body: state.recordList }, { root: false });
            }
        },
    },
    modules: {
        options: {
            namespaced: true,
            ...gridOptions,
        },
    },
};
