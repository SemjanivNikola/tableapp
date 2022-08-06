import axios from "axios";

/**
 * NOTE: We don't need to read list from API, because we get it from workspace.
 */
export default {
    state: {
        view: null,
    },
    mutations: {
        setSelected (state, payload) {
            state.view = payload;
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
    },
    getters: {
        get: (state) => {
            return state.view;
        },
        isViewSelected: (state) => (id) => {
            return id === state.view.id;
        },
    },
    actions: {
        readView ({ commit }) {
            return axios.get("/view").then((res) => {
                commit("setSelected", res.data);
                return res.data;
            }).
                catch((err) => {
                    console.warn("Error > ", err);
                });
        },
        createView ({ commit }, payload) {
            return axios.post("/view", payload).then((res) => {
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
