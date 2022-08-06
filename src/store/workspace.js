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
 *  5. GET workspace by id - from map
 *  6. DELETE workspace by id - do a request then delete from map
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
    getters: {
        workspaceById: (state) => (id) => {
            return state.map.find((item) => {
                return item.id === id;
            });
        },

    },
    actions: {
        process ({ dispatch, getters }, payload) {
            const { table_list, ...otherProps } = getters.workspaceById(payload);

            dispatch("table/process", { map: table_list, selected: otherProps.selected_table_id },
                { root: true });
        },
        readWorkspaceList ({ commit }) {
            const map = tabledata;
            commit("setMap", map);


            /*
             * TODO: Uncoment when backend is deployed
             * await axios.get("/workspace").then((res) => {
             *     console.warn("RES >> ", res);
             *     const { view_list, table_list, ...otherProps } = res.data;
             */

            /*
             *     commit("setMap", otherProps);
             *     commit("setLst1", table_list, { root: false });
             *     commit("table/view/setList2", view_list, { root: false });
             * }).
             *     catch((err) => {
             *         console.warn(err);
             *     });
             */
        },
        createWorkspace ({ commit }, payload) {
            return axios.get("/api/workspace", payload).then((res) => {
                const { view_list, table_list, ...otherProps } = res.data;

                commit("addNewWorkspace", otherProps);
                commit("table/addNew", table_list, { root: true });
                commit("view/addNew", view_list, { root: true });

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
