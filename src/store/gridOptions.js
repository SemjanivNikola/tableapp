import sortByMultipleFields from "@/utils/sort";
import filterByMultipleFields from "@/utils/filter";

const mathOperation = {
    "add": (a, b) => a + b,
    "subtract": (a, b) => a - b,
};

export default {
    state: {
        options: null,
        indexHelperList: [],
    },
    mutations: {
        set (state, payload) {
            state.options = payload;
        },
        setSort (state, payload) {
            state.options.sort = payload;
        },
        addSortOption (state, payload) {
            state.options.sort.push(payload);
        },
        indexHelperList (state, payload) {
            state.indexHelperList = payload;
        },
        setFieldsHidden (state, payload) {
            state.options.hidden = mathOperation[payload](state.options.hidden, 1);
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
            // TODO: Talk about this. We need to add summary field at some point, if it doesn't exist.
            if (!state.options || !state.options.summary.includes("hide_fields")) {
                commit("addOptionToSummary", "hide_fields");
            }
        },
        lastFieldRemoved ({ state, commit }) {
            if (state.options.hidden === 0) {
                commit("removeOptionFromSummary", "hide_fields");
            }
        },
        handleFieldVisibility ({ commit, dispatch }, payload) {
            commit("setFieldsHidden", payload);

            dispatch("firstFieldHidden");
            dispatch("lastFieldRemoved");
        },

        sortFields ({ state }, payload) {
            const fieldIndexList = [];
            state.options.sort.forEach((field) => {
                // TODO: Talk about this - maybe we can use indexes instead of field id's
                const fieldIndex = payload.header.findIndex((header) => field.id === header.id);
                fieldIndexList.push({ fieldIndex, direction: field.direction });
            });
            return sortByMultipleFields(payload.body, fieldIndexList);
        },

        filterRecords ({ state }, payload) {
            const fieldIndexList = [];
            state.options.filter.forEach((field) => {
                // TODO: Talk about this - maybe we can use indexes instead of field id's
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
                clone.body = await dispatch("sortFields", { header: clone.header, body: clone.body });
            }

            if (getters.isOptionApplied("filter")) {
                clone.body = await dispatch("filterRecords", { header: clone.header, body: clone.body });
            }

            return clone;
        },
    },
};
