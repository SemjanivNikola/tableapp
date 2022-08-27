<template>
    <div class="structure-wrapper">
        <div class="input-group">
            <div id="container">
                <icon name="menu" :size="16" color="white" />
                <input
                    type="search"
                    class="form-control rounded"
                    placeholder="  Search"
                    aria-label="Search"
                    aria-describedby="search-addon"
                />
            </div>
            <structure-action :onCreate="handleCreate" />
        </div>
        <ul>
            <li v-for="table in structure" :key="table.id">
                <a href="#">{{ table.title }}</a>
                <ul>
                    <li
                        v-for="view in table.view_list"
                        :key="view.id"
                        :class="{ active: isSelected(view.id, table.id) }"
                    >
                        <a href="#" @click="selectItem(view.id, table.id)">{{
                            view.title
                        }}</a>
                    </li>
                </ul>
            </li>
        </ul>
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
import { mapGetters, mapState } from "vuex";
import CreateStructure from "./CreateStructure.vue";
import ModalWrapper from "@/components/ModalWrapper.vue";
import StructureAction from "./StructureAction.vue";

export default {
    components: { StructureAction, ModalWrapper, CreateStructure },
    name: "WorkspaceStructure",
    data () {
        return {
            search: "",
            title: this.$store.getters["workspace/getTitle"],
            isCreateModalShown: false,
            createStructure: null,
        };
    },
    methods: {
        isSelected (viewID, tableID) {
            const isViewSelected = this.$store.getters["table/isViewSelected"];
            return isViewSelected(viewID, tableID);
        },
        handleCreate (value) {
            this.createStructure = value;
            this.isCreateModalShown = true;
        },
        close () {
            this.$store.commit("setShowFeedback", false);
        },
        selectItem (viewId, tableId) {
            const isTableSelected =
                this.$store.getters["table/isTableSelected"];
            if (isTableSelected(tableId)) {
                this.$store.commit("table/setSelectedViewId", viewId);
            } else {
                this.$store.commit("table/setSelected", tableId);
            }
            this.$store.commit("table/setSelectedViewId", viewId);
        },
    },
    computed: {
        ...mapState(["table"]),
        ...mapGetters(["getAppFeedback", "shouldShowFeedback"]),
        structure () {
            return this.table.map;
        },
    },
};
</script>

<style scoped>
.structure-wrapper {
    width: 18%;
}
.form-control {
    background-color: #211d43;
    color: white;
    width: 100%;
}
#container {
    display: flex;
    padding: 5px;
}
#structure {
    display: flex;
    align-items: center;
    flex-direction: row;
}
a {
    color: white;
    text-decoration: none;
}
li.active {
    background-color: #6bd1ff;
}
</style>
