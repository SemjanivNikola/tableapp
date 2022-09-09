<template>
    <div
        class="structure-wrapper"
        :style="{ maxWidth: isStructureOpen ? `${210}px` : 0 }"
    >
        <ul class="list-wrapper">
            <li
                v-for="table in structure"
                :key="table.id"
                :class="[
                    { activeTable: isTableSelected(table.id) },
                    'list-wrapper-item',
                ]"
            >
                <a href="#">{{ table.title }}</a>
                <ul id="view-list">
                    <li
                        v-for="view in table.view_list"
                        :key="view.id"
                        :class="[
                            { active: isSelected(view.id, table.id) },
                            'view-list-item',
                        ]"
                    >
                        <span class="view-title-wrapper">
                            <icon name="file" :size="14" color="rgb(0, 0, 0)" />
                            <a
                                href="#"
                                @click="selectItem(view.id, table.id)"
                                >{{ view.title }}</a
                            >
                        </span>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
import Icon from "@/components/Icon.vue";
import { mapGetters, mapState } from "vuex";

export default {
    name: "WorkspaceStructure",
    components: { Icon },
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
        isTableSelected (tableID) {
            const isTableSelected =
                this.$store.getters["table/isTableSelected"];
            return isTableSelected(tableID);
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
    overflow-x: hidden;
    overflow-y: scroll;
    height: calc(100vh - 126px);
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
ul.list-wrapper {
    list-style: none;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding: 8px 12px;
}
ul.list-wrapper li.list-wrapper-item {
    margin: 8px 0;
    border-bottom: 1px solid rgb(229, 229, 229);
}
ul.list-wrapper li.list-wrapper-item.activeTable {
    border-bottom: none;
}
#view-list {
    list-style: none;
    padding: 8px !important;
}
li.view-list-item {
    font-size: 13px;
    font-weight: 400;
    padding: 2px 8px;
}
.view-title-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 3px;
}
a {
    color: rgb(0, 0, 0);
    text-decoration: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
li.view-list-item.active {
    background-color: rgba(4, 217, 57, 0.511);
}
</style>
