<template>
    <div class="table-view-wrapper">
        <table>
            <header-list :header="tableHeader" />
            <table-record-list @onRecordCreate="onRecordCreate" />
        </table>

        <modal-wrapper :is-shown="isRecordExpandShown">
            <record-expand
                :fields="tableHeader"
                :record="newRecord"
                @close="isRecordExpandShown = false"
            />
        </modal-wrapper>
    </div>
</template>

<script>
import HeaderList from "./HeaderList.vue";
import ModalWrapper from "@/components/ModalWrapper.vue";
import RecordExpand from "./RecordExpand.vue";
import TableRecordList from "./TableRecordList.vue";

export default {
    name: "TableView",
    components: {
        HeaderList,
        TableRecordList,
        ModalWrapper,
        RecordExpand,
    },
    data () {
        return {
            tableHeader: [],
            isRecordExpandShown: false,
            newRecord: null,
        };
    },
    created () {
        this.tableHeader = this.$store.getters["view/getHeader"];
    },
    methods: {
        onRecordCreate (record) {
            const helper = JSON.parse(JSON.stringify(record));
            // Remove first element that contains row number
            this.newRecord = helper.slice(1);
            this.newRecord.forEach((cell) => {
                cell.value = "";
            });

            this.isRecordExpandShown = true;
        },
    },
};
</script>

<style scoped>
table {
    border-collapse: collapse;
}
.new-col-wrapper {
    display: inline-block;
    width: 56px;
    height: 20px;
    background-color: gray;
    color: black;
}
.table-view-wrapper {
    overflow-x: scroll;
    overflow-y: scroll;
    padding: 0 50px 16px 0;
    height: calc(100vh - 126px);
}
</style>
