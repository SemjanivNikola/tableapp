// import axios from "axios";

import axios from "axios";

/**
 * NOTE: We don't need to read list from API, because we get it from workspace.
 */
export default {
    state: {
        map: [],
        selectedTable: null,
    },
    mutations: {
        setViewList (state, payload) {
            if (state.length > 0) {
                state.map.length = 0;
            }

            state.map = payload;
        },
        addNewTable (state, payload) {
            state.map.push(payload);
        },
    },
    actions: {
        createTable ({ commit }, payload) {
            return axios.post("/api/table", payload).then((res) => {
                commit("addNewTable", res.data);
                return res.data;
            }).
                catch((err) => {
                    console.warn(err);
                });
        },
    },
    modules: {

    },
};
