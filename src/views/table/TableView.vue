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
            v-for="(header, index) in modifyHeader"
            :key="index"
          >
            {{ header.text }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in modifyBody"
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
            hideFields: this.data.options.hideFields,
            hideFieldsHelper: [],
            tableHeader: this.data.header,
            tableBody: this.data.body,
        };
    },
    computed: {
        modifyHeader () {
            if (!this.activeOptions.includes("hide_fields")) {
                return this.tableHeader;
            }

            const clone = [...this.tableHeader];
            // TODO: Fix this
            // eslint-disable-next-line vue/no-side-effects-in-computed-properties
            this.hideFieldsHelper = [];

            this.options.hideFields.forEach((field) => {
                const index = clone.findIndex((item) => item.id === field + 1);
                clone.splice(index, 1);
                this.hideFieldsHelper.push(index);
            }, this);
            return clone;
        },

        modifyBody () {
            if (!this.activeOptions.includes("hide_fields")) {
                return this.tableBody;
            }

            const clone = JSON.parse(JSON.stringify(this.tableBody));

            this.hideFieldsHelper.forEach((field) => {
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
                console.warn("WATCHER VAL >> ", val);

                /*
                 * this.tableHeader = this.modifyHeader;
                 * this.tableBody = this.modifyBody;
                 */
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
