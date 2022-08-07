<template>
  <div
    class="wrapper"
    :class="getStatus"
  >
    <h6>Sort by</h6>
    <div v-if="select.length === 0">
      <table-field-picker
        :fields="fields"
        :handle-field-pick="handleFieldPick"
      />
    </div>

    <div v-else>
      <sort-option-item
        v-for="(item, index) in select"
        :key="index"
        :initial="item"
        :fields="fields"
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
        v-for="(header, index) in fields"
        :key="header.id"
        @click="handleFieldPick(index)"
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
            this.select.push({
                field: index,
                sort: 1,
            });

            if (this.showPicker) {
                this.showPicker = false;
            }
        },
        handleSort () {
            // TODO: sort
            console.warn(this.select);
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
