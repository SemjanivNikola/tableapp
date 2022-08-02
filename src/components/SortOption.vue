<template>
  <div
    class="wrapper"
    :class="getStatus"
  >
    <h6>Sort by</h6>
    <div v-if="select.length === 0">
      <div
        v-for="(header, index) in fields"
        :key="header.id"
        @click="handleInitialFieldPick(index)"
      >
        {{ header.text }}
      </div>
    </div>

    <div v-else>
      <sort-option-item
        v-for="(item, index) in select"
        :key="index"
        :initial="item"
        :fields="fields"
      />

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
import SortOptionItem from "./SortOptionItem.vue";

export default {
    name: "SortOption",
    components: { SortOptionItem },
    props: {
        isShown: {
            type: Boolean,
            required: true,
        },
    },
    data () {
        return {
            fields: tableData.header,
            select: [],
        };
    },
    computed: {
        getStatus () {
            return this.isShown ? "show" : "hidden";
        },
    },
    beforeMount () {
        tableData.options.sort.forEach(item => {
            this.select.push(item);
        }, this);
    },
    methods: {
        handleInitialFieldPick (index) {
            this.select = this.fields[index].id;
        },
        handleSort () {
            // TODO: sort
            console.log(this.select);
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
