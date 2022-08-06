
export default {
    state: {
        options: null,
    },
    mutations: {
        set (state, payload) {
            state.options = payload;
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
    },
    actions: {
        firstFieldHidden ({ state, commit }) {
            if (!state.options.summary.includes("hide_fileds")) {
                commit("addOptionToSummary", "hide_fields");
            }
        },
        lastFieldRemoved ({ state, commit }) {
            if (state.options.hideFields.length === 0) {
                commit("removeOptionFromSummary", "hide_fields");
            }
        },

    },
};
