<template>
  <div
    class="wrapper"
    :class="getStatus"
  >
    <div v-if="filterList.length === 0">
      <p>No filter conditions are applied to this view</p>
    </div>

    <div v-else>
      <filter-option-item
        v-for="(item, index) in filterList"
        :key="index"
        :initial="item"
        :fields="fields"
      />
    </div>

    <button
      class="btn"
      @click="addFilter"
    >
      + Add condition
    </button>
  </div>
</template>

<script>
import FilterOptionItem from "./FilterOptionItem.vue";
import tableData from "../../mock-data/grid_view_one.json";

export default {
    name: "FilterOption",
    components: {
        FilterOptionItem,
    },
    props: {

        isShown: {
            type: Boolean,
            required: true,
        },
    },
    data () {
        return {
            fields: tableData.header,
            filterList: [],
            showPicker: false,
        };
    },
    computed: {
        getStatus () {
            return this.isShown ? "show" : "hidden";
        },
    },
    beforeMount () {
        tableData.options.filter.forEach((item) => {
            this.filterList.push(item);
        }, this);
    },
    methods: {
        addFilter () {
            this.filterList.push({
                logic: this.filterList.length === 0 ? "where" : "and",
                field: null,
                condition: null,
                value: "",
            });
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
    padding: 16px;
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
