<template>
  <div>
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
import tableData from "../../../mock-data/grid_view_one.json";
import TableActionBar from "./TableActionBar.vue";

export default {
    name: "TableView",
    components: { TableActionBar },
    data () {
        return {
            mockData: tableData,
            activeOptions: tableData.options.summary,
            tableHeader: tableData.header,
            tableBody: tableData.body,
        };
    },
    computed: {
        modifyHeader () {
            if (!this.mockData.options.summary.includes("hide_fileds")) {
                return this.mockData.header;
            }

            const clone = [...this.mockData.header];
            this.mockData.options.hideFields.forEach((field) => {
                clone.splice(field, 1);
            }, this);
            return clone;
        },

        modifyBody () {
            if (!this.mockData.options.summary.includes("hide_fileds")) {
                return this.mockData.body;
            }

            const clone = [...this.mockData.body];
            this.mockData.options.hideFields.forEach((field) => {
                clone.forEach((row) => {
                    row.splice(field, 1);
                });
            }, this);
            return clone;
        },
    },
    watch: {
        activeOptions: {
            handler (val) {
                console.log(val);
                this.tableHeader = this.modifyHeader;
                this.tableBody = this.modifyBody;
            },
            deep: true,
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
</style>
