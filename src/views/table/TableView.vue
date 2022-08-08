<template>
  <div style="overflow-x: scroll;">
    <table-action-bar />
    <!-- <table-header :header="mockData.header" />
    <table-body :body="mockData.body" /> -->

    <table>
      <header-list :header="tableHeader" />
      <tbody>
        <tr
          v-for="row in tableBody"
          :key="row.id"
        >
          <td>{{ row.id }}</td>
          <td
            v-for="(cell, cellIndex) in row.cells"
            :key="cellIndex"
            :class="{hidden: !cell.isShown}"
          >
            {{ cell.value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import HeaderList from "./HeaderList.vue";
import TableActionBar from "./TableActionBar.vue";

export default {
    name: "TableView",
    components: { TableActionBar, HeaderList },
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
