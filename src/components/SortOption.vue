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
              v-model="select.text"
              :items="fields"
              label="Field"
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
              :items="sortOptions"
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
    name: "ActionOptions",
    props: {
        isShown: {
            type: Boolean,
            required: true,
        },
    },
    data () {
        return {
            mockData: tableData,
            fields: tableData.header,
            textSort: [{ text: "A -> Z", value: 1 }, { text: "Z -> A", value: 2 }],
            numberSort: [{ text: "First -> Last", value: 1 }, { text: "Last -> First", value: 2 }],
            statusSort: [{ text: "1 -> 9", value: 1 }, { text: "9 -> 1", value: 2 }],
            select: null,
            sortOptions: null,
        };
    },
    computed: {
        getStatus () {
            return this.isShown ? "show" : "hidden";
        },
    },
    watch: {
        select: {
            handler (val) {
                console.log(val);
            },
            deep: true,
        },
    },
    methods: {
        handleInitialFieldPick (index) {
            this.select = this.fields[index];
        },
        handleSort () {
            console.log(this.select);
        },
        handleHideFields (index) {
            if (!this.mockData.header[index].isHidden) {
                this.mockData.header[index].isHidden = true;
                this.mockData.options.hideFields.push(index);

                // If it's first field to be hidden add hide_fields option to summary
                if (!this.mockData.options.summary.includes("hide_fileds")) {
                    this.mockData.options.summary.push("hide_fileds");
                }
            } else this.mockData.header[index].isHidden = false;

            // If the last index is removed, remove the hide_fileds option
            if (this.mockData.options.hideFields.length === 0) {
                this.mockData.options.summary.splice(
                    this.mockData.options.summary.indexOf("hide_fileds"),
                    1,
                );
            }

            console.log("hideFields", this.mockData.options);
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
