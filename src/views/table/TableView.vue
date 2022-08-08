<template>
    <div style="overflow-x: scroll;">
      <table-action-bar />

      <table>
        <header-list :header="tableHeader" />
        <table-record-list :record-list="getRecordList" />
      </table>
    </div>
</template>

<script>
import { mapState } from "vuex";
import HeaderList from "./HeaderList.vue";
import TableActionBar from "./TableActionBar.vue";
import TableRecordList from "./TableRecordList.vue";

export default {
    name: "TableView",
    components: { TableActionBar, HeaderList, TableRecordList },
    data () {
        return {
            tableHeader: [],
        };
    },
    created () {
        this.tableHeader = this.$store.getters["view/getHeader"];
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
th, td {
  border: 1px solid #fff;
  color: white;
}
th.hidden, td.hidden {
  display: none;
}
</style>
