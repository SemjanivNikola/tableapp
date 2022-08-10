import axios from "axios";

/**
 * NOTE: We don't need to read list from API, because we get it from workspace.
 */
export default {
    state: {
        map: [],
        selectedTable: null,
        selectedViewId: null,
    },
    mutations: {
        setSelected (state, payload) {
            state.selectedTable = payload;
        },
        setSelectedViewId (state, payload) {
            state.selectedViewId = payload;
        },
        setMap (state, payload) {
            if (state.length > 0) {
                state.map.length = 0;
            }

            state.map = payload;
        },
        addNew (state, payload) {
            state.map.push(payload);
        },
        addNewView (state, payload) {
            state.selectedTable.view_list.push(payload);
        },
    },
    getters: {
        getMap: (state) => {
            return state.map;
        },
        getSelectedViewId: (state) => {
            return state.selectedViewId;
        },
        getSelectedId: (state) => {
            return state.selectedTable.id;
        },
        isTableSelected: (state) => (id) => {
            return id === state.selectedTable.id;
        },
        isViewSelected: (state, getters) => (viewID, tableID) => {
            return viewID === state.selectedViewId && getters.isTableSelected(tableID);
        },
    },
    actions: {
        process ({ commit }, payload) {
            commit("setMap", payload.map);

            const table = payload.map[payload.selected - 1];
            commit("setSelected", table);
            commit("setSelectedViewId", table.selected_view_id);
        },
        createTable ({ commit }, payload) {
            return axios.post("/api/table", payload).then((res) => {
                commit("addNew", res.data);
                commit("setAppFeedback", "Table created successfully", { root: true });
                return true;
            }).
                catch((err) => {
                    commit("setAppFeedback", `Error: ${err.message}`, { root: true });
                    return false;
                });
        },
    },
};
