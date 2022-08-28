<template>
    <div class="structure-wrapper" :style="{maxWidth: isStructureOpen ? `${210}px` : 0}">
        <ul>
            <li v-for="table in structure" :key="table.id">
                <a href="#">{{ table.title }}</a>
                <ul>
                    <li
                        v-for="view in table.view_list"
                        :key="view.id"
                        :class="[{active: isSelected(view.id, table.id)}, 'view-item' ]"
                    >
                        <a href="#" @click="selectItem(view.id, table.id)">{{
                            view.title
                        }}</a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
    name: "WorkspaceStructure",
    data () {
        return {
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
        ...mapGetters(["isStructureOpen"]),
        structure () {
            return this.table.map;
        },
    },
};
</script>

<style scoped>
.structure-wrapper {
    overflow: hidden;
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
li.view-item {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
a {
    color: white;
    text-decoration: none;
}
li.active {
    background-color: #6bd1ff;
}
</style>
