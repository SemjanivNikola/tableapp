<template>
    <div style="overflow-x: scroll;">
      <table-action-bar />

      <table>
        <header-list :header="tableHeader" />
        <table-record-list :record-list="tableBody" />
      </table>
    </div>
</template>

<script>
import HeaderList from "./HeaderList.vue";
import TableActionBar from "./TableActionBar.vue";
import TableRecordList from "./TableRecordList.vue";

export default {
    name: "TableView",
    components: { TableActionBar, HeaderList, TableRecordList },
    data () {
        return {
            tableHeader: [],
            tableBody: [],
        };
    },
    created () {
        const { header, body } = this.$store.getters["view/get"];
        this.tableHeader = header;
        this.tableBody = body;
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
