<template>
  <div>
    <table-action-bar />
    <!-- <table-header :header="mockData.header" />
    <table-body :body="mockData.body" /> -->

    <table>
      <thead>
        <tr>
          <th
            v-for="(header, index) in mockData.header"
            :key="index"
          >
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in mockData.body"
          :key="rowIndex"
        >
          <td
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
          >
            {{ cell.value }}
          </td>
        </tr>
      </tbody>
    </table>

    TABLE
  </div>
</template>

<script>
import tableData from "../../../mock-data/table_one.json";
import TableActionBar from "./TableActionBar.vue";

export default {
  name: "TableView",
  components: { TableActionBar },
  data () {
    return {
      mockData: tableData,
    };
  },
};
</script>

<style scoped>
th, td {
  color: white;
}
</style>
