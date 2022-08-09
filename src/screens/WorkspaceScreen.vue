<template>
  <div id="screen-wrapper">
    <workspace-structure />
    <workspace-table />
    <modal-wrapper :is-shown="shouldShowHome">
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
    </modal-wrapper>
  </div>
</template>

<script>
import ModalWrapper from "@/components/ModalWrapper.vue";
import WorkspaceStructure from "../views/workspace/WorkspaceStructure.vue";
import WorkspaceTable from "../views/workspace/WorkspaceTable.vue";

export default {
    name: "WorkspaceScreen",
    components: { WorkspaceStructure, WorkspaceTable, ModalWrapper },
    data () {
        return {
            shouldShowHome: false,
            workspace: null,
        };
    },
    created () {
        // TODO: Remove when HOME is DONE. Read wont be here. This is only temporary for testing purposes.
        this.$store.dispatch("workspace/readWorkspaceList");

        this.shouldShowHome = false; // TODO: Uncomment this when HOME is done -> !this.$route.params.id;
        this.$watch(() => this.$route.params.id, this.getWorkspace(3));
    },
    methods: {
        getWorkspace (id) {
            if (!id) {
                return;
            }
            this.$store.dispatch("workspace/process", id);
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
