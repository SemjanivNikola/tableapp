import axios from "axios";
import gridOptions from "./gridOptions";

/**
 * NOTE: We don't need to read list from API, because we get it from workspace.
 */
export default {
    state: {
        view: null,
        bodyClone: null,
    },
    mutations: {
        setSelected (state, payload) {
            state.view = payload;
        },
        setBodyClone (state, payload) {
            state.bodyClone = payload;
        },
        setMap (state, payload) {
            if (state.length > 0) {
                state.map.length = 0;
            }

            state.map = payload;
        },
        // TODO: Add new view
        addNew (state, payload) {
            state.map.push(payload);
        },
        toggleFieldVisibility (state, payload) {
            state.view.header[payload.index].isShown = payload.isShown;

            state.view.body.forEach((row) => {
                row.cells[payload.index].isShown = payload.isShown;
            });

            state.bodyClone.forEach((row) => {
                row.cells[payload.index].isShown = payload.isShown;
            });

        },
    },
    getters: {
        get: (state) => {
            return { header: state.view.header, body: state.bodyClone };
        },
        getHeader: (state) => {
            return state.view.header;
        },
        isViewSelected: (state) => (id) => {
            return id === state.view.id;
        },
    },
    actions: {
        readView ({ commit }, payload) {
            return axios.get(`/view?id=${payload}`).then((res) => {
                const { options, ...otherprops } = res.data;

                commit("setSelected", otherprops);
                commit("view/options/set", options, { root: true });
                return res.data;
            }).
                catch((err) => {
                    console.warn("Error > ", err);
                    throw err;
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
        async handleBodyModification ({ state, commit, dispatch }) {
            const viewClone = await dispatch("options/modifyBody", state.view);
            commit("setBodyClone", viewClone.body);
            return true;
        },
        handleHideFields ({ state, commit, dispatch }, payload) {
            if (state.view.header[payload].isShown) {
                commit("toggleFieldVisibility", { index: payload, isShown: false });
                dispatch("view/options/handleFieldVisibility", "add", { root: true });
            } else {
                commit("toggleFieldVisibility", { index: payload, isShown: true });
                dispatch("view/options/handleFieldVisibility", "subtract", { root: true });
            }
        },
        handleSort ({ commit, dispatch }, payload) {
            commit("view/options/setSort", payload, { root: true });
            dispatch("handleBodyModification");
        },
    },
    modules: {
        options: {
            namespaced: true,
            ...gridOptions,
        },
    },
};
