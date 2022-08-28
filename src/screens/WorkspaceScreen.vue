<template>
    <div id="scree-wrapper">
        <div id="screen-info">
            <div class="hover-action">
                <icon name="file" :size="28" />
                <div class="menu-wrapper">
                    <icon name="menu" color="rgb(0, 0, 0)" :size="16" />
                </div>
            </div>
            <div class="spacer-md"></div>
            <h1>Workspace title</h1>
        </div>
        <table-action-bar />
        <div id="screen-content">
            <workspace-structure />
            <workspace-table />
            <modal-wrapper :is-shown="shouldShowHome">
                OVO JE HOME MODAL
                <button @click="shouldShowHome = false">Zatvori</button>
                <div>
                    <button @click="navigate">NAVIGIRAJ NA 1</button>
                </div>
                <div>
                    <router-link :to="{ path: '/workspace=2' }">
                        LINK NA 2
                    </router-link>
                </div>
            </modal-wrapper>
        </div>
    </div>
</template>

<script>
import ModalWrapper from "@/components/ModalWrapper.vue";
import WorkspaceStructure from "../views/workspace/WorkspaceStructure.vue";
import WorkspaceTable from "../views/workspace/WorkspaceTable.vue";
import Icon from "@/components/Icon.vue";
import TableActionBar from "../views/table/TableActionBar.vue";

export default {
    name: "WorkspaceScreen",
    components: { WorkspaceStructure, WorkspaceTable, ModalWrapper, Icon, TableActionBar },
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
}
#screen-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px;
}
#screen-info h1 {
    color: rgb(255, 255, 255);
    font-size: 28px;
}
#screen-info .hover-action {
    position: relative;
}
#screen-info .hover-action:hover .menu-wrapper {
    opacity: 1;
}
#screen-content {
    width: inherit;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;
}
.menu-wrapper {
    position: absolute;
    top: -2px;
    left: -2px;
    background-color: bisque;
    padding: 8px;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 300ms ease-out;
    cursor: pointer;
    z-index: 100;
}
</style>
