<template>
  <v-row align="center">
    <v-col class="d-flex" cols="5" sm="4">
      <div class="flex-row">
        <v-select
          v-model="selected"
          :items="fields"
          item-value="id"
          @change="onChange"
        />
      </div>
    </v-col>

    <v-col class="d-flex" cols="5" sm="4">
      <div class="flex-row">
        <v-select
          v-model="sortSelect"
          :items="sortOptions"
          label="Options"
          @change="onChange"
        />
      </div>
    </v-col>

    <v-col class="d-flex" cols="2" sm="2">
      <button @click="removeOption">x</button>
    </v-col>
  </v-row>
</template>

<script>
const TEXT_SORT = [
    { text: "A -> Z", value: 1 },
    { text: "Z -> A", value: 2 },
];
const STATUS_SORT = [
    { text: "First -> Last", value: 1 },
    { text: "Last -> First", value: 2 },
];
const NUMBER_SORT = [
    { text: "1 -> 9", value: 1 },
    { text: "9 -> 1", value: 2 },
];

const SortOption = Object.freeze({
    TEXT: "text",
    NUMBER: "number",
    STATUS: "status",
});

export default {
    name: "SortOptionItem",
    props: {
        initial: {
            type: Object,
            required: true,
        },
        fields: {
            type: Array,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
    },
    data () {
        return {
            selected: this.fields[this.initial.id - 1].id,
            sortSelect: this.initial.direction,
            sortOptions: null,
            initSortDirection: this.initial.direction,
        };
    },
    watch: {
        selected: {
            // val represents saved obj.id - ID is autoincrement so we can use it to get the correct obj.type
            handler (val) {
                const item = this.fields[val - 1];

                this.selectSortOptByType(item.type);
            },
            deep: true,
        },
    },
    created () {
        this.selectSortOptByType(this.fields[this.initial.id - 1].type);
    },
    methods: {
        selectSortOptByType (type) {
            if (type === SortOption.TEXT) {
                this.sortOptions = TEXT_SORT;
            } else if (type === SortOption.NUMBER) {
                this.sortOptions = NUMBER_SORT;
            } else if (type === SortOption.STATUS) {
                this.sortOptions = STATUS_SORT;
            }
        },
        onChange () {
            this.$emit("onChange", {
                index: this.index,
                option: { id: this.selected, direction: this.sortSelect },
            });
        },
        removeOption () {
            this.$store.dispatch("view/handleSortOptionRemove", this.index);
        },
    },
};
</script>
