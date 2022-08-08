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
            v-for="(header, index) in tableHeader"
            :key="index"
          >
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in tableBody"
          :key="rowIndex"
        >
          <td>{{ rowIndex }}</td>
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
import TableActionBar from "./TableActionBar.vue";

export default {
    name: "TableView",
    components: { TableActionBar },
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
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
        console.warn("bodyClone", body);
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
</style>
