<template>
    <v-app id="app">
        <div class="mx-0 d-flex flex">
            <router-view name="sidebar" />
            <router-view />
        </div>
    </v-app>
</template>

<script>
export default {
    name: "App",
    data () {
        return {};
    },
};
</script>

<style lang="css">
@import "./style/constants.css";
#app {
    background-color: var(--background-default);
}
.no-padding {
    padding: 0 !important;
}
/* ****** DROPDOWN ****** */
.dropdown-wrapper {
    display: none;
    position: absolute;
    top: 20px;
    left: 4px;
    min-width: 180px;
    padding: 0 8px 8px 8px;
    background-color: #fff;
    border-radius: 6px;
    overflow: visible;
    -webkit-box-shadow: 10px 10px 23px -10px rgba(0, 0, 0, 0.45);
    -moz-box-shadow: 10px 10px 23px -10px rgba(0, 0, 0, 0.45);
    box-shadow: 10px 10px 23px -10px rgba(0, 0, 0, 0.45);
    z-index: 999;
}
.wrap-scroll {
    overflow-y: scroll;
}
.dropdown-wrapper.show {
    display: block;
}
.dropdown-item-wrap {
    border-bottom: 1px solid rgb(229, 229, 229);
    transition: padding 300ms ease-out;
    cursor: pointer;
}
.dropdown-item {
    display: flex;
    align-items: center;
    font-size: 16px;
    max-height: 38px;
    color: #000;
    padding: 8px;
    font-weight: 400;
    border-radius: 6px;
}
.dropdown-item-wrap:hover {
    background-color: rgba(4, 217, 57, 0.511);
}
</style>
