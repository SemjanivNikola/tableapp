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
        addHeaderField (state, payload) {
            state.view.header.push(payload);
        },
        addRecordCell (state, payload) {
            state.recordList.forEach((row) => {
                row.push({ value: "", isShown: true, type: payload });
            });
        },
        deleteField (state, payload) {
            state.view.header.splice(payload, 1);
            state.view.body.forEach((row) => {
                row.splice(payload + 1, 1);
            });
            state.recordList.forEach((row) => {
                row.splice(payload + 1, 1);
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
                    return false;
                });
        },
        createField ({ state, commit }, payload) {
            try {
                const headerLen = state.view.header.length + 1;
                commit("addHeaderField", { id: headerLen,
                    type: payload.type,
                    fieldType: payload.fieldType,
                    text: `Field ${headerLen}`,
                    isShown: true });

                commit("addRecordCell", payload.id);
                commit("setAppFeedback", "Field created successfully", { root: true });
                // dispatch("syncView"); // Should we put this here?
                return true;

            } catch (err) {
                commit("setAppFeedback", `Error:  ${err}`, { root: true });
                return false;
            }
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
        handleDeleteField ({ state, commit, dispatch, rootGetters }, payload) {
            const index = state.view.header.findIndex((field) => field.id === payload);
            const options = rootGetters["view/options/get"];

            options.sort.forEach((val, sortIndex) => {
                if (val.id === payload) {
                    dispatch("options/sortOptionRemove", sortIndex, { root: false });
                }
            });

            options.filter.forEach((val, filterIndex) => {
                if (val.id === payload) {
                    dispatch("options/filterOptionRemove", filterIndex, { root: false });
                }
            });

            commit("deleteField", index);
            // dispatch("syncView"); // Should we put this here?
        },
        syncView ({ state, commit, rootGetters }) {
            const sync = {
                workspace: rootGetters["workspace/getSelectedId"],
                table: rootGetters["table/getSelectedId"],
                view: { ...state.view, body: { ...state.recordList } },
            };

            return axios.post("/sync-view", sync).then(() => {
                commit("setAppFeedback", "Field created successfully", { root: true });
                return true;
            }).
                catch((err) => {
                    commit("setAppFeedback", `Error:  ${err}`, { root: true });
                    return false;
                });

        },
    },
    modules: {
        options: {
            namespaced: true,
            ...gridOptions,
        },
    },
};
