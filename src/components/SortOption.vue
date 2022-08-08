<template>
  <div
    class="wrapper"
    :class="getStatus"
  >
    <h6>Sort by</h6>
    <p>After every change you make be sure to apply those changes. Otherwise it won't be visible.</p>
    <div v-if="select.length === 0">
      <table-field-picker
        :fields="fields"
        :handle-field-pick="handleFieldPick"
      />
    </div>

    <div v-else>
      <sort-option-item
        v-for="(item, index) in select"
        :key="item.id"
        :index="index"
        :initial="item"
        :fields="fields"
        @onChange="handleChange"
      />

      <div style="position: relative;">
        <v-btn
          block
          @click="showPicker = !showPicker"
        >
          Add field
        </v-btn>

        <table-field-picker
          v-if="showPicker"
          :fields="fields"
          :handle-field-pick="handleFieldPick"
        />
      </div>

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
import SortOptionItem from "./SortOptionItem.vue";

const TableFieldPicker = {
    name: "table-field-picker",
    props: {
        fields: {
            type: Array,
            required: true,
        },
        handleFieldPick: {
            type: Function,
            required: true,
        },
    },
    template: `<div><div
        v-for="header in fields"
        :key="header.id"
        @click="handleFieldPick(header.id)"
      >
        {{ header.text }}
      </div></div>`,
};

export default {
    name: "SortOption",
    components: { SortOptionItem, TableFieldPicker },
    props: {
        isShown: {
            type: Boolean,
            required: true,
        },
    },
    data () {
        return {
            fields: [],
            select: [],
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
        this.select = this.$store.getters["view/options/sortOptions"];
    },
    methods: {
        handleFieldPick (index) {
            this.$store.commit("view/options/addSortOption", {
                id: index,
                direction: 1,
            }, { root: true });

            if (this.showPicker) {
                this.showPicker = false;
            }
        },
        handleChange (value) {
            this.$store.commit("view/options/updateSortOption", {
                index: value.index,
                value: value.option,
            }, { root: true });
        },
        handleSort () {
            this.$store.dispatch("view/handleSort", this.select);
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
