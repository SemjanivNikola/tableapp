<template>
    <div id="screen-wrapper">
        <div id="screen-info">
            <div class="hover-action">
                <icon name="file" :size="28" />
                <div class="menu-wrapper">
                    <icon name="menu" color="rgb(0, 0, 0)" :size="16" />
                </div>
            </div>
            <div class="spacer-md"></div>
            <h1>{{title}}</h1>
            <div class="spacer-md"></div>
            <structure-action :onCreate="handleCreate" />
        </div>
        <table-action-bar />

        <div v-if="isLoading || isError" class="status-wrapper">
            <div v-if="isLoading" class="loader-wrapper">Loading</div>
            <div v-else class="error-wrapper">
                Error happened when trying to fetch workspace data
            </div>
        </div>

        <div v-else id="screen-content">
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

        <modal-wrapper :is-shown="isCreateModalShown">
            <create-structure
                :structure="createStructure"
                @close="isCreateModalShown = false"
            />
        </modal-wrapper>

        <v-snackbar
            timeout="-1"
            :value="shouldShowFeedback"
            absolute
            left
            shaped
            bottom
            style="z-index: 9999"
        >
            {{ getAppFeedback }}
            <template v-slot:action="{ attrs }">
                <v-btn color="blue" text v-bind="attrs" @click="close">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import ModalWrapper from "@/components/ModalWrapper.vue";
import WorkspaceStructure from "../views/workspace/WorkspaceStructure.vue";
import CreateStructure from "../views/workspace/CreateStructure.vue";
import WorkspaceTable from "../views/workspace/WorkspaceTable.vue";
import Icon from "@/components/Icon.vue";
import TableActionBar from "../views/table/TableActionBar.vue";
import StructureAction from "../views/workspace/StructureAction.vue";

export default {
    name: "WorkspaceScreen",
    components: {
        WorkspaceStructure,
        WorkspaceTable,
        ModalWrapper,
        Icon,
        TableActionBar,
        StructureAction,
        CreateStructure,
    },
    data () {
        return {
            shouldShowHome: false,
            title: "-",
            isCreateModalShown: false,
            createStructure: null,
            isLoading: false,
            isError: false,
        };
    },
    created () {
        // TODO: Remove when HOME is DONE. Read wont be here. This is only temporary for testing purposes.
        this.$store.dispatch("workspace/readWorkspaceList");

        this.shouldShowHome = false; // TODO: Uncomment this when HOME is done -> !this.$route.params.id;
        this.$watch(() => this.$route.params.id, this.getWorkspace(1));
    },
    methods: {
        getWorkspace (id) {
            this.isError = false;
            this.isLoading = true;

            if (!id) {
                this.isError = true;
                return;
            }
            this.$store.
                dispatch("workspace/process", id).
                then(() => {
                    this.title = this.$store.getters["workspace/getTitle"];
                    this.isLoading = false;
                }).
                catch(() => {
                    this.isLoading = false;
                    this.isError = true;
                });
        },
        navigate () {
            this.$router.push({ path: `/workspace=${1}` });
        },
        handleCreate (value) {
            this.createStructure = value;
            this.isCreateModalShown = true;
        },
        close () {
            this.$store.commit("setShowFeedback", false);
        },
    },
    computed: {
        ...mapGetters(["getAppFeedback", "shouldShowFeedback"]),
    },
};
</script>

<style scoped>
#screen-wrapper {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
}
#screen-info {
    display: flex;
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
    flex-basis: 100%;
    justify-content: flex-start;
    background-color: rgb(245, 245, 245);
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
.error-wrapper, .loader-wrapper {
    color: #fff;
}
</style>
