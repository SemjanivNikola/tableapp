<template>
  <div style="overflow-x: scroll;">
    <table-action-bar />
    <!-- <table-header :header="mockData.header" />
    <table-body :body="mockData.body" /> -->

    <table>
      <thead>
        <tr>
          <th>Placeholder</th>
          <th
            v-for="header in tableHeader"
            :key="header.id"
            :class="{hidden: !header.isShown}"
          >
            {{ header.text }}
          </th>
        </tr>
      </thead>
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
import TableActionBar from "./TableActionBar.vue";

export default {
    name: "TableView",
    components: { TableActionBar },
    data () {
        return {
            tableHeader: [],
            tableBody: [],
        };
    },
    async created () {
        const { body, header } = await this.$store.dispatch("view/handleBodyModification");
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
