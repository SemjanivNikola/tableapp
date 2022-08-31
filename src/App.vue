<template>
  <v-app id="app">
    <div class="mx-0 d-flex flex">
    <router-view name="sidebar" />
    <router-view/>
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

<style lasn="css">
@import "./style/constants.css";
#app {
  background-color: var(--background-default);
}
</style>
