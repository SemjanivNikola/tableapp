<template>
  <div
    class="wrapper"
    :class="getStatus"
  >
    <div v-if="!filter">
      <p>No filter conditions are applied to this view</p>
    </div>

    <div v-else>
      <span>Where</span>
      <v-select
        v-model="selected"
        :items="fields"
        item-value="id"
      />
      <v-select
        v-model="condition"
        :items="CONDITION_LIST"
        item-value="value"
        item-text="label"
      />
      <v-text-field />
    </div>

    <button class="btn">
      + Add condition
    </button>
  </div>
</template>

<script>
import tableData from "../../mock-data/table_one.json";

const CONDITION_LIST = [
    { value: 1, label: "contains" },
    { value: 2, label: "does not contain" },
    { value: 3, label: "is" },
    { value: 4, label: "is not" },
    { value: 5, label: "is empty" },
    { value: 6, label: "is not empty" },
];

export default {
    name: "FilterOption",
    props: {
        isShown: {
            type: Boolean,
            required: true,
        },
    },
    data () {
        return {
            fields: tableData.header,
            selected: this.fields[0].id,
            condition: CONDITION_LIST[0].value,
            showPicker: false,
        };
    },
    computed: {
        getStatus () {
            return this.isShown ? "show" : "hidden";
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
