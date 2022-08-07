import axios from "axios";
import gridOptions from "./gridOptions";

/**
 * NOTE: We don't need to read list from API, because we get it from workspace.
 */
export default {
    state: {
        view: null,
        bodyClone: [],
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
            state.view.header[payload.index].isHidden = payload.isHidden;
        },
    },
    getters: {
        get: (state) => {
            return state.view;
        },
        getHeader: (state) => {
            return state.view.header;
        },
        getBodyClone: (state) => {
            return state.bodyClone;
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
        handleHideFields ({ state, commit, dispatch }, payload) {
            if (state.view.header[payload].isHidden) {
                commit("toggleFieldVisibility", { index: payload, isHidden: false });
                commit("view/options/handleFieldVisibility", { index: payload, shouldAddIndex: false }, { root: true });
            } else {
                commit("toggleFieldVisibility", { index: payload, isHidden: true });
                commit("view/options/handleFieldVisibility", { index: payload, shouldAddIndex: true }, { root: true });

                // If it's first field to be hidden add hide_fields option to summary
                dispatch("options/firstFieldHidden");
            }

            // If the last index is removed, remove the hide_fileds option
            dispatch("options/lastFieldRemoved");
        },
        async handleBodyModification ({ state, commit, dispatch }) {
            const body = await dispatch("options/modifyBody", state.view);
            commit("setBodyClone", body);
            return body;
        },
    },
    modules: {
        options: {
            namespaced: true,
            ...gridOptions,
        },
    },
};
