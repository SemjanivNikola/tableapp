<template>
    <div>
        <input @click="toggle" type="text" :value="cellValue" readonly>

        <modal-wrapper :is-shown="shouldShowModal">
            <v-btn @click="toggle">Zatvori</v-btn>
            <div style="position: relative">
                <div v-for="item in tableList" :key="item.id">
                    <div>{{ item.title }}</div>
                    <ul>
                        <li
                            v-for="view in item.view_list"
                            :key="view.id"
                            @click="handleRecordListView(item.id, view.id)"
                        >
                            <div>{{ view.title }}</div>
                        </li>
                    </ul>
                </div>

                <!-- VIEW RECORD VIEW -->
                <div :class="[{ active: isRecordListActive }, 'list-wrapper']">
                    <v-btn @click="isRecordListActive = false">Vrati se</v-btn>
                    <ul>
                        <li
                            v-for="item in mock"
                            :key="item.id"
                            @click="addLink(item)"
                        >
                            <h4>{{ item.header }}</h4>
                            <div>{{ item.value }}</div>
                        </li>
                    </ul>
                    <v-btn @click="save" :disabled="!selectedItem"
                        >Spremi</v-btn
                    >
                </div>
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
    },
    methods: {
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
        addLink (item) {
            this.selectedItem = item;
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
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.list-wrapper.active {
    display: block;
}
</style>
