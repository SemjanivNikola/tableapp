import sortByMultipleFields from "@/utils/sort";
import filterByMultipleFields from "@/utils/filter";

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
            return state.options ? state.options.sort : [];
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

        sortFields ({ state }, payload) {
            const fieldIndexList = [];
            state.options.sort.forEach((field) => {
                const fieldIndex = payload.header.findIndex((header) => field.id === header.id);
                fieldIndexList.push({ fieldIndex, direction: field.direction });
            });

            const sorted = sortByMultipleFields(payload.body, fieldIndexList);
            payload.body = sorted;
        },

        filterRecords ({ state }, payload) {
            const fieldIndexList = [];
            state.options.filter.forEach((field) => {
                const fieldIndex = payload.header.findIndex((header) => field.id === header.id);
                fieldIndexList.push({ fieldIndex, options: field });
            });

            return filterByMultipleFields(payload.body, fieldIndexList);
        },


        async modifyBody ({ getters, dispatch }, payload) {
            if (!getters.get) {
                return payload;
            }

            const clone = JSON.parse(JSON.stringify(payload));

            if (getters.isOptionApplied("sort")) {
                dispatch("sortFields", { header: clone.header, body: clone.body });
            }

            if (getters.isOptionApplied("filter")) {
                const filtered = await dispatch("filterRecords", { header: clone.header, body: clone.body });
                clone.body = filtered;
            }

            return clone;
        },
    },
};
