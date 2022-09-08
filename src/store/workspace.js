import axios from "axios";
import tabledata from "../../mock-data/workspace_list.json";

/**
 * TODO:
 *  1. Name update
 *  2. Description update
 *  3. Icon update
 *      3.1. Icon color update
 *      3.2. Icon name update
 *  4. Backgound color update
 *  6. DELETE workspace by id - do a request then delete from map
 */

export default {
    state: {
        map: [],
        selected: null,
    },
    mutations: {
        setMap (state, payload) {
            if (state.length > 0) {
                state.map.length = 0;
            }

            state.map = payload;
        },
        setSelected (state, payload) {
            state.selected = payload;
        },
        addNewWorkspace (state, payload) {
            state.map.push(payload);
        },
    },
    getters: {
        getMap: (state) => {
            return state.map;
        },
        workspaceById: (state) => (id) => {
            return state.map.find((item) => {
                return item.id === id;
            });
        },
        getSelectedId: (state) => {
            return state.selected.id;
        },
        getTitle: (state) => {
            return state.selected.title;
        },
    },
    actions: {
        process ({ dispatch, commit }, payload) {
            return axios.get(`/workspace/${payload}`).then((res) => {
                const { table_list, ...otherProps } = res.data;

                commit("setSelected", otherProps);
                dispatch("table/process", { map: table_list, selected: otherProps.selected_table_id },
                    { root: true });
                return true;
            }).
                catch((err) => {
                    commit("setAppFeedback", `Error: ${err.message}`, { root: true });
                    return false;
                });
        },
        readWorkspaceList ({ commit }) {
            const map = tabledata;
            commit("setMap", map);


            /*
             * TODO: Uncoment when backend is deployed
             * await axios.get("/workspace").then((res) => {
             *     console.warn("RES >> ", res);
             *
             *     commit("setMap", res.data);
             * }).
             *     catch((err) => {
             *         console.warn(err);
             *     });
             */
        },
        createWorkspace ({ commit }, payload) {
            return axios.post("/workspace", payload).then((res) => {
                commit("addNewWorkspace", res.data);

                commit("setAppFeedback", "Workspace created successfully", { root: true });
                return true;
            }).
                catch((err) => {
                    commit("setAppFeedback", `Error: ${err.message}`, { root: true });
                    return false;
                });
        },

    },
};
