<template>
  <div class="wrapper" :class="getStatus">
    <div v-if="filterList.length === 0">
      <p>No filter conditions are applied to this view</p>
    </div>

    <div v-else>
      <filter-option-item
        v-for="(item, index) in filterList"
        :key="item.id"
        :index="index"
        :initial="item"
        :fields="fields"
        @onChange="handleChange"
      />
    </div>

    <button class="btn" @click="addFilter">+ Add condition</button>
    <button class="btn" @click="handleFilter">Apply changes</button>
  </div>
</template>

<script>
import FilterOptionItem from "./FilterOptionItem.vue";

export default {
    name: "FilterOption",
    components: { FilterOptionItem },
    props: {
        isShown: {
            type: Boolean,
            required: true,
        },
    },
    data () {
        return {
            fields: [],
            filterList: [],
            showPicker: false,
        };
    },
    computed: {
        getStatus () {
            return this.isShown ? "show" : "hidden";
        },
    },
    created () {
        this.fields = this.$store.getters["view/getHeader"];
        this.filterList = this.$store.getters["view/options/filterOptions"];
    },
    methods: {
        addFilter () {
            this.$store.commit(
                "view/options/addFilterOption",
                {
                    logic: this.filterList.length === 0 ? "where" : "and",
                    field: null,
                    condition: null,
                    value: "",
                },
                { root: true },
            );
        },
        handleChange (value) {
            this.$store.commit("view/options/updateFilterOption", {
                index: value.index,
                value: value.option,
            }, { root: true });
        },
        handleFilter () {
            this.$store.dispatch("view/handleFilter", this.filterList);

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
.btn {
  display: block;
}
</style>
