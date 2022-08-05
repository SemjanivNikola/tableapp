<template>
  <div id="screen-wrapper">
    <workspace-structure />
    <workspace-view :workspace="workspace" />
    <modal :is-shown="shouldShowHome">
      OVO JE HOME MODAL
      <button @click="shouldShowHome = false">
        Zatvori
      </button>
      <div>
        <button @click="navigate">
          NAVIGIRAJ NA 1
        </button>
      </div>
      <div>
        <router-link :to="{path: '/workspace=2'}">
          LINK NA 2
        </router-link>
      </div>
    </modal>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import WorkspaceStructure from "../views/workspace/WorkspaceStructure.vue";
import WorkspaceView from "../views/workspace/WorkspaceView.vue";

export default {
    name: "Workspace",
    components: { WorkspaceStructure, WorkspaceView, Modal },
    data () {
        return {
            shouldShowHome: false,
            workspace: null,
        };
    },
    created () {
        this.shouldShowHome = false; // TODO: Uncomment this when HOME is done -> !this.$route.params.id;
        this.$watch(() => this.$route.params.id, this.getWorkspace(this.$route.params.id));
    },
    methods: {
        getWorkspace (id) {
            if (!id) {
                return;
            }
            this.workspace = this.$store.dispatch("workspace/getWorkspace", id);
        },
        navigate () {
            this.$router.push({ path: `/workspace=${1}` });
        },
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
