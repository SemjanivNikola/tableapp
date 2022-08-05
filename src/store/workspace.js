import axios from "axios";
import view from "./view";

/**
 * TODO:
 *  1. Name update
 *  2. Description update
 *  3. Icon update
 *      3.1. Icon color update
 *      3.2. Icon name update
 *  4. Backgound color update
 */

export default {
    state: {
        map: [],
    },
    mutations: {
        setMap (state, payload) {
            if (state.length > 0) {
                state.map.length = 0;
            }
            state.map = payload;
        },
        addNewWorkspace (state, payload) {
            state.map.push(payload);
        },
    },
    actions: {
        async readWorkspaceList ({ commit }) {
            await axios.get("/api/workspace").then(res => {
                commit("setMap", res.data);
            }).catch(err => {
                console.log(err);
            });
        },
        async createWorkspace ({ commit }, payload) {
            await axios.get("/api/workspace", payload).then(res => {
                commit("addNewWorkspace", res.data);
            }).catch(err => {
                console.log(err);
            });
        },
    },
    modules: {
        view: {
            namespaced: true,
            ...view,
        },
    },
};
