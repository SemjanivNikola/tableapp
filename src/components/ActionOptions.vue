<template>
  <div
    class="wrapper"
    :class="getStatus"
  >
    <div
      v-for="header in mockData.header"
      :key="header.id"
    >
      {{ header.text }}
    </div>
  </div>
</template>

<script>
import tableData from "../../mock-data/table_one.json";

/**
 * 1. radio-btn-list
 *      hide/show btn
 * 2. dropdown-list
 *      sort btn
 * 3. condition-list
 *      filter btn
 * 4. modal
 *      trash btn
 */

export default {
    name: "ActionOptions",
    props: {
        optionType: {
            type: String,
            default: "radio-btn-list",
            required: false,
        },
        isShown: {
            type: Boolean,
            required: true,
        },
    },
    data () {
        return {
            mockData: tableData,
        };
    },
    computed: {
        getStatus () {
            return this.isShown ? "show" : "hidden";
        },
    },
    mounted () {
        console.log("PROP >> ", this.optionType);
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
