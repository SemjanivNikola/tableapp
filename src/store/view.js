// import axios from "axios";

import axios from "axios";

/**
 * NOTE: We don't need to read list from API, because we get it from workspace.
 */
export default {
    state: {
        title: "THIS IS GRID VIEW",
        map: [],
        selectedView: null,
    },
    mutations: {
        setViewList (state, payload) {
            if (state.length > 0) {
                state.map.length = 0;
            }

            state.map = payload;
        },
        addNewView (state, payload) {
            state.map.push(payload);
        },
    },
    actions: {
        createView ({ commit }, payload) {
            return axios.post("/api/view", payload).then((res) => {
                commit("addNewView", res.data);
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
