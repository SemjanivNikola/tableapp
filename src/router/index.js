import Vue from "vue";
import VueRouter from "vue-router";
import WorkspaceScreen from "../screens/WorkspaceScreen.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        alias: "/workspace=:id",
        name: "Workspace",
        component: WorkspaceScreen,
    },
    {
        path: "/myworkspace",
        name: "Workspace",
        component: WorkspaceScreen,
        components: {
            default: () => import("@/views/MyWorkspace.vue"),
        },
    },
    {
        path: "/recenttables",
        name: "Workspace",
        component: WorkspaceScreen,
        components: {
            default: () => import("@/views/RecentTables.vue"),
        },
    },
    {
        path: "/profile",
        name: "Workspace",
        component: WorkspaceScreen,
        components: {
            default: () => import("@/views/ProfileScreen.vue"),
        },
    },
    // {
    //   path: "/about",
    //   name: "About",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
    // },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
