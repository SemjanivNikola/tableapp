import axios from "axios";
import Vue from "vue";
import App from "./App.vue";
import Icon from "./components/Icon";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";


axios.defaults.baseURL = "https://runbookmanagerapp.herokuapp.com";

Vue.component("Icon", Icon);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: (ren) => ren(App),
}).$mount("#app");
