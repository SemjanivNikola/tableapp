<template>
  <v-app id="app">
    <workspace />
  </v-app>
</template>

<script>
import Workspace from "./screens/Workspace.vue";

export default {
  name: "App",
  components: { Workspace },

  data () {
    return {};
  },
};
</script>

<style lasn="css">
@import "./style/constants.css";
#app {
  background-color: var(--background);
}
</style>
