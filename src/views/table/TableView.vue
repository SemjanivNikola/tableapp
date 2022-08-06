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
            options: this.data.options,
            activeOptions: this.data.options.summary,
            tableHeader: this.data.header,
            tableBody: this.data.body,
        };
    },
    computed: {
        modifyHeader () {
            if (!this.activeOptions.includes("hide_fileds")) {
                return this.tableHeader;
            }

            const clone = [...this.tableHeader];
            this.options.hideFields.forEach((field) => {
                clone.splice(field, 1);
            }, this);
            return clone;
        },

        modifyBody () {
            if (!this.activeOptions.includes("hide_fileds")) {
                return this.tableBody;
            }

            const clone = [...this.tableBody];
            this.options.hideFields.forEach((field) => {
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
                console.warn(val);
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
