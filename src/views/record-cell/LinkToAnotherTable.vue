<template>
    <div>
        <input @click="toggle" type="text" :value="cellValue" readonly />

        <modal-wrapper :is-shown="shouldShowModal">
            <div class="header">
                <v-btn @click="toggle">Zatvori</v-btn>
            </div>

            <div class="content-header">
                <h5>TABLE</h5>
                <span class="vertical-divider"></span>
                <h5>VIEW</h5>
                <span class="vertical-divider"></span>
                <h5>RECORD</h5>
            </div>

            <div class="content-wrapper">
                <!-- TABLE ITESM -->
                <ul class="content-item">
                    <li
                        v-for="(item, index) in tableList"
                        :key="item.id"
                        :class="[
                            { active: activeTableIndex === index },
                            'content-item-background',
                        ]"
                        @click="handleActiveTable(index)"
                    >
                        {{ item.title }}
                    </li>
                </ul>

                <!-- VIEW ITEMS -->
                <ul class="content-item">
                    <li
                        v-for="view in viewList"
                        :key="view.id"
                        :class="[
                            { active: activeViewId === view.id },
                            'content-item-background',
                        ]"
                        @click="handleRecordListView(item.id, view.id)"
                    >
                        <div>{{ view.title }}</div>
                    </li>
                </ul>

                <!-- VIEW RECORD ITEMS -->
                <ul class="content-item">
                    <li
                        v-for="(item, index) in mock"
                        :key="index"
                        @click="addLink(item, index)"
                        :class="[
                            { active: activeRecordIndex === index },
                            'content-item-background',
                        ]"
                    >
                        <h4>{{ item.header }}</h4>
                        <div>{{ item.value }}</div>
                    </li>
                </ul>
            </div>

            <div class="header">
                <v-btn @click="save" :disabled="!selectedItem">Spremi</v-btn>
            </div>
        </modal-wrapper>
    </div>
</template>

<script>
import ModalWrapper from "@/components/ModalWrapper.vue";

export default {
    name: "CheckboxInput",
    props: {
        cell: {
            type: Object,
            required: true,
        },
    },
    components: { ModalWrapper },
    // eslint-disable-next-line max-lines-per-function
    data () {
        return {
            activeTableIndex: 0,
            activeViewId: null,
            activeRecordIndex: null,
            cellValue: null,
            shouldShowModal: false,
            isRecordListActive: false,
            selectedItem: null,
            tableList: [],
            mock: [
                {
                    tableId: 1,
                    viewId: 1,
                    recordIndex: 1,
                    header: "Header Title 1",
                    value: "Record value 1",
                },
                {
                    tableId: 1,
                    viewId: 1,
                    recordIndex: 2,
                    header: "Header Title 2",
                    value: "Record value 2",
                },
                {
                    tableId: 1,
                    viewId: 1,
                    recordIndex: 3,
                    header: "Header Title 3",
                    value: "Record value 3",
                },
                {
                    tableId: 1,
                    viewId: 1,
                    recordIndex: 4,
                    header: "Header Title 4",
                    value: "Record value 4",
                },
                {
                    tableId: 1,
                    viewId: 1,
                    recordIndex: 5,
                    header: "Header Title 5",
                    value: "Record value 5",
                },
                {
                    tableId: 1,
                    viewId: 1,
                    recordIndex: 6,
                    header: "Header Title 6",
                    value: "Record value 6",
                },
                {
                    tableId: 1,
                    viewId: 1,
                    recordIndex: 7,
                    header: "Header Title 7",
                    value: "Record value 7",
                },
                {
                    tableId: 1,
                    viewId: 1,
                    recordIndex: 8,
                    header: "Header Title 8",
                    value: "Record value 8",
                },
            ],
        };
    },
    created () {
        const selectedTableId = this.$store.getters["table/getSelectedId"];
        this.tableList = this.$store.getters["table/getMap"].filter(
            (item) => item.id !== selectedTableId,
        );
        this.cellValue = this.cell.value.value;
        this.activeViewId = this.tableList[this.activeTableIndex].view_list[0].id;
    },
    methods: {
        handleActiveTable (index) {
            this.activeTableIndex = index;
        },
        toggle () {
            this.shouldShowModal = !this.shouldShowModal;
        },
        handleRecordListView (tableId, viewId) {
            console.warn(tableId, viewId);
            this.isRecordListActive = true;
            // this.mock = this.$store.dispatch("readViewRecords", {
            //     table: tableId,
            //     view: viewId,
            // });
        },
        addLink (item, index) {
            this.selectedItem = item;
            this.activeRecordIndex = index;
            this.$parent.$emit("onIndexSave");
        },
        save () {
            this.$store.dispatch(
                "view/handleRecordCellUpdate",
                this.selectedItem,
                { root: true },
            );
            this.isRecordListActive = false;
            this.toggle();
            this.cellValue = this.selectedItem.value;
        },
    },
    computed: {
        viewList () {
            return this.tableList[this.activeTableIndex].view_list;
        },
    },
};
</script>

<style scoped>
td:first-child input.c-input {
    max-width: 65px;
    width: 65px;
}
td input.c-input {
    padding: 2px 4px;
}
input.c-input:focus {
    outline: var(--background-default) auto 1px;
}
.list-wrapper {
    display: block;
    width: 100%;
    height: 100%;
}
.header {
    text-align: end;
    padding: 0 16px;
}
.content-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-right: 2px solid rgb(229, 229, 229);
    padding: 8px 0;
}
.content-header:last-child {
    border-right: none;
}
.content-header h5 {
    width: 100%;
    text-align: center;
}
.vertical-divider {
    display: inline-block;
    height: 22px;
    width: 2px;
    flex-grow: 1;
    flex-shrink: 0;
    background-color: rgb(229, 229, 229);
}
.content-wrapper {
    display: flex;
    align-items: flex-start;
    padding: 0 16px;
}
.content-item {
    position: relative;
    width: 100%;
    height: 360px;
    padding-left: 16px;
    overflow-x: hidden;
    overflow-y: scroll;
}
.content-item-background {
    padding: 4px 8px;
    margin: 4px 0;
}
.content-item-background.active {
    background-color: rgb(243, 133, 133);
}
ul.content-item {
    list-style-type: none;
}
</style>
