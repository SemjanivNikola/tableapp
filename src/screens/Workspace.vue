<template>
  <div id="screen-wrapper">
    <workspace-structure />
    <workspace-view />
  </div>
</template>

<script>
import WorkspaceStructure from "../views/workspace/WorkspaceStructure.vue";
import WorkspaceView from "../views/workspace/WorkspaceView.vue";

export default {
  name: "Workspace",
  components: { WorkspaceStructure, WorkspaceView },
  data () {
    return {};
  },
};
</script>

<style scoped>
#screen-wrapper {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;
}
</style>
