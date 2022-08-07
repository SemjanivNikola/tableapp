
export default {
    state: {
        options: null,
        indexHelperList: [],
    },
    mutations: {
        set (state, payload) {
            state.options = payload;
        },
        indexHelperList (state, payload) {
            state.indexHelperList = payload;
        },
        handleFieldVisibility (state, payload) {
            if (payload.shouldAddIndex) {
                state.options.hideFields.push(payload.index);
            } else {
                const indexToRemove = state.options.hideFields.indexOf(payload.index);
                state.options.hideFields.splice(indexToRemove, 1);
            }
        },
        addOptionToSummary (state, payload) {
            state.options.summary.push(payload);
        },
        removeOptionFromSummary (state, payload) {
            state.options.summary.splice(state.options.summary.indexOf(payload), 1);
        },
    },
    getters: {
        get: (state) => {
            return state.options;
        },
        sortOptions: (state) => {
            return state.options.sort;
        },
        isOptionApplied: (state) => (payload) => {
            return state.options.summary.includes(payload);
        },
    },
    actions: {
        firstFieldHidden ({ state, commit }) {
            if (!state.options.summary.includes("hide_fields")) {
                commit("addOptionToSummary", "hide_fields");
            }
        },
        lastFieldRemoved ({ state, commit }) {
            if (state.options.hideFields.length === 0) {
                commit("removeOptionFromSummary", "hide_fields");
            }
        },
        hideFieldHeader ({ state, commit }, payload) {
            const indexList = [];
            state.options.hideFields.forEach((field) => {
                const index = payload.findIndex((item) => item.id === field + 1);
                payload.splice(index, 1);
                indexList.push(index);
            });
            commit("indexHelperList", indexList);
        },
        hideFiledBody ({ state }, payload) {
            state.indexHelperList.forEach((field) => {
                payload.forEach((row) => {
                    row.splice(field, 1);
                });
            });
        },

        sortBody ({ state }, payload) {
            const fieldIndexList = [];
            state.options.sort.forEach((field) => {
                const fieldIndex = payload.header.findIndex((header) => field.id === header.id);
                fieldIndexList.push({ fieldIndex, direction: field.direction });
            });
            payload.body.sort((rowA, rowB) => {
                const itemA = rowA[fieldIndexList[0].fieldIndex].value;
                const itemB = rowB[fieldIndexList[0].fieldIndex].value;
                if (itemA < itemB) {
                    return -1;
                }
                if (itemA > itemB) {
                    return 1;
                }
                return 0;
            });
        },


        modifyBody ({ getters, dispatch }, payload) {
            const clone = JSON.parse(JSON.stringify(payload));

            /*
             * HIDE FIELDS
             * if (getters.isOptionApplied("hide_fields")) {
             *     console.log("HIDIMNG FIELDS");
             *     dispatch("hideFieldHeader", clone.header);
             *     console.log("HEADER DONE");
             *     dispatch("hideFiledBody", clone.body);
             *     console.log("BODY DONE - HIDING FIELDS DONE");
             * }
             */

            // SORT
            if (getters.isOptionApplied("sort")) {
                dispatch("sortBody", { header: clone.header, body: clone.body });
            }

            // FILTER
            if (getters.isOptionApplied("filter")) {
                // FILTER HERE
            }
            return clone;
        },
    },
};
