import axios from "axios";
import Vue from "vue";
import App from "./App.vue";
import Icon from "./components/Icon";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";

window.axios = axios.create({
    baseURL: "http://localhost:3000/",
});

Vue.component("Icon", Icon);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
}).$mount("#app");
