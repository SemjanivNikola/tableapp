<template>
  <div style="overflow-x: scroll">
    <table-action-bar />

      <table>
        <header-list :header="tableHeader" />
        <table-record-list
          :record-list="getRecordList"
          @onRecordCreate="onRecordCreate"
        />
      </table>
    <modal-wrapper :is-shown="isRecordExpandShown">
        <record-expand
            :fields="tableHeader"
            @close="isRecordExpandShown = false"
        />
    </modal-wrapper>
  </div>
</template>

<script>
import ModalWrapper from "@/components/ModalWrapper.vue";
import { mapState } from "vuex";
import HeaderList from "./HeaderList.vue";
import TableActionBar from "./TableActionBar.vue";
import TableRecordList from "./TableRecordList.vue";
import RecordExpand from "./RecordExpand.vue";

export default {
    name: "TableView",
    components: { TableActionBar, HeaderList, TableRecordList, ModalWrapper, RecordExpand },
    data () {
        return {
            tableHeader: [],
            isRecordExpandShown: false,
        };
    },
    created () {
        this.tableHeader = this.$store.getters["view/getHeader"];
    },
    methods: {
        onRecordCreate () {
            this.isRecordExpandShown = true;
        },
    },
    computed: {
        ...mapState(["view"]),
        getRecordList () {
            return this.view.recordList;
        },
    },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #fff;
  color: white;
}
th.hidden,
td.hidden {
  display: none;
}
</style>
