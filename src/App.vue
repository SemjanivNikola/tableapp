<template>
  <v-app id="app">
    <router-view />
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
  background-color: var(--background-dark);
}
</style>
