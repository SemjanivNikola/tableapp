import axios from "axios";
import table from "./table";

/**
 * TODO:
 *  1. Name update
 *  2. Description update
 *  3. Icon update
 *      3.1. Icon color update
 *      3.2. Icon name update
 *  4. Backgound color update
 *  5. GET workspace by id - from map
 *  6. DELETE workspace by id - do a request then delete from map
 */

export default {
    state: {
        map: [],
        selectedWorkspace: null,
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
    getters: {
        get: (state) => (id) => {
            return state.map.find((workspace) => workspace.id === id);
        },
    },
    actions: {
        async readWorkspaceList ({ commit }) {
            await axios.get("/api/workspace").then((res) => {
                const { view_list, ...otherProps } = res.data;

                commit("setMap", otherProps);
                commit("view/setViewList", view_list, { root: true });
            }).
                catch((err) => {
                    console.warn(err);
                });
        },
        async reateWorkspace ({ commit }, payload) {
            try {
                const res = await axios.get("/api/workspace", payload);
                const { view_list, ...otherProps } = res.data;

                commit("addNewWorkspace", otherProps);
                commit("view/addNewView", view_list, { root: true });
                return res.data;
            } catch (err) {
                console.warn(err);
                return "error";
            }
        },
    },
    modules: {
        table: {
            namespaced: true,
            ...table,
        },
    },
};
