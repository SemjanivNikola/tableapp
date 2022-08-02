<template>
  <div
    class="wrapper"
    :class="getStatus"
  >
    <h6>Sort by</h6>

    <div v-if="!select">
      <div
        v-for="(header, index) in mockData.header"
        :key="header.id"
        @click="handleInitialFieldPick(index)"
      >
        {{ header.text }}
      </div>
    </div>

    <div v-else>
      <v-row align="center">
        <v-col
          class="d-flex"
          cols="5"
          sm="4"
        >
          <div class="flex-row">
            <v-select
              v-model="select"
              :items="fields"
              item-text="text"
              item-value="id"
            />
          </div>
        </v-col>

        <v-col
          class="d-flex"
          cols="5"
          sm=""
        >
          <div class="flex-row">
            <v-select
              v-model="sortSelect"
              :items="sortOptions"
              item-text="text"
              item-value="value"
              label="Options"
            />
          </div>
        </v-col>

        <v-col
          class="d-flex"
          cols="2"
          sm="2"
        >
          x
        </v-col>
      </v-row>

      <v-btn
        block
        @click="handleSort"
      >
        Apply changes
      </v-btn>
    </div>
  </div>
</template>

<script>
import tableData from "../../mock-data/table_one.json";

export default {
    name: "SortOption",
    props: {
        isShown: {
            type: Boolean,
            required: true,
        },
    },
    data () {
        return {
            mockData: tableData,
            fields: [],
            select: null,
            sortSelect: null,
            sortOptions: null,
            textSort: [{ text: "A -> Z", value: 1 }, { text: "Z -> A", value: 2 }],
            numberSort: [{ text: "First -> Last", value: 1 }, { text: "Last -> First", value: 2 }],
            statusSort: [{ text: "1 -> 9", value: 1 }, { text: "9 -> 1", value: 2 }],
        };
    },
    computed: {
        getStatus () {
            return this.isShown ? "show" : "hidden";
        },
    },
    watch: {
        select: {
            // val represents saved obj.id - ID is autoincrement so we can use it to get the correct obj.type
            handler (val) {
                const item = this.fields[val - 1];

                if (item.type === "text") {
                    this.sortOptions = this.textSort;
                } else if (item.type === "number") {
                    this.sortOptions = this.numberSort;
                } else if (item.type === "status") {
                    this.sortOptions = this.statusSort;
                }
                this.sortSelect = this.sortOptions[0];
            },
            deep: true,
        },
    },
    beforeMount () {
        const tableHead = JSON.parse(JSON.stringify(tableData.header));

        if (tableData.options.sort.length > 0) {
            let itemsRemoved = 0;
            tableData.options.sort.forEach(item => {
                tableHead.splice(item.field - itemsRemoved, 1);
                itemsRemoved++;
            });
        }
        this.fields = tableHead;
    },
    methods: {
        handleInitialFieldPick (index) {
            this.select = this.fields[index].id;
        },
        handleSort () {
            // TODO: sort
            console.log(this.select);
        },
        handleHideFields (index) {
            if (!tableData.header[index].isHidden) {
                tableData.header[index].isHidden = true;
                tableData.options.hideFields.push(index);

                // If it's first field to be hidden add hide_fields option to summary
                if (!tableData.options.summary.includes("hide_fileds")) {
                    tableData.options.summary.push("hide_fileds");
                }
            } else tableData.header[index].isHidden = false;

            // If the last index is removed, remove the hide_fileds option
            if (tableData.options.hideFields.length === 0) {
                tableData.options.summary.splice(
                    tableData.options.summary.indexOf("hide_fileds"),
                    1,
                );
            }

            console.log("hideFields", tableData.options);
        },
    },
};
</script>

<style scoped>
.wrapper {
    position: absolute;
    top: 28px;
    left: 2px;
    width: 360px;
    height: 430px;
    background-color: #fff;
    overflow-x: hidden;
    overflow-y: scroll;
    z-index: 9999;
}
.wrapper.show {
    display: block;
}
.wrapper.hidden {
    display: none;
}
</style>
