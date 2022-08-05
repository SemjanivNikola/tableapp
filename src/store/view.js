import axios from "axios";

export default {
    state: {
        title: "THIS IS GRID VIEW",
        map: [],
    },
    mutations: {
    },
    actions: {
        getTable: function (context) {
            console.log("CALLED TABLE YES YES :: ", context.state.title);
            return context.state.title;
        },
    },
    modules: {

    },
};
