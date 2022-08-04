<template>
  <v-row
    align="center"
  >
    <v-col
      class="d-flex"
      cols="12"
      sm="6"
    >
      <div
        class="flex-row"
      >
        <span v-if="logic === 'where'">{{ logic }}</span>
        <v-select
          v-else
          v-model="logic"
          :items="LOGIC_CONDITION_OPTIONS"
          item-value="label"
          item-text="label"
        />
        <v-select
          v-model="field"
          :items="fields"
          item-value="id"
        />
        <v-select
          v-model="condition"
          :items="conditionOptions"
          item-value="value"
          item-text="label"
        />
        <v-text-field
          v-model="value"
          placeholder="Enter a value"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script>
const TEXT_CONDITION_OPTIONS = [
    { value: 1, label: "contains" },
    { value: 2, label: "does not contain" },
    { value: 3, label: "is" },
    { value: 4, label: "is not" },
    { value: 5, label: "is empty" },
    { value: 6, label: "is not empty" },
];
const NUMBER_CONDITION_OPTIONS = [
    { value: 1, label: "=" },
    { value: 2, label: "≠" },
    { value: 3, label: "<" },
    { value: 4, label: ">" },
    { value: 5, label: "≤" },
    { value: 6, label: "≥" },
    { value: 7, label: "is empty" },
    { value: 8, label: "is not empty" },
];
const STATUS_CONDITION_OPTIONS = [
    { value: 1, label: "is" },
    { value: 2, label: "is not" },
    { value: 3, label: "is any of" },
    { value: 4, label: "is none of" },
    { value: 5, label: "is empty" },
    { value: 6, label: "is not empty" },
];
const LOGIC_CONDITION_OPTIONS = [
    { label: "and" },
    { label: "or" },
];

const SortOption = Object.freeze({
    TEXT: "text",
    NUMBER: "number",
    STATUS: "status",
});

export default {
    name: "FilterOptionItem",
    props: {
        initial: {
            type: Object,
            required: true,
        },
        fields: {
            type: Array,
            required: true,
        },
    },
    data () {
        return {
            logic: this.initial.logic,
            field: this.initial.field,
            condition: this.initial.condition,
            value: this.initial.value,
            conditionOptions: [],
            LOGIC_CONDITION_OPTIONS,
        };
    },
    watch: {
        field: {
            // val represents saved obj.id - ID is autoincrement so we can use it to get the correct obj.type
            handler (val) {
                const item = this.fields[val - 1];

                this.selectSortOptByType(item.type);
            },
            deep: true,
        },
    },
    beforeMount () {
        if (!this.initial.field) {
            this.field = this.fields[0].id;
        } else {
            this.selectSortOptByType(this.fields[this.initial.field - 1].type);
        }
    },
    methods: {
        selectSortOptByType (type) {
            if (type === SortOption.TEXT) {
                this.conditionOptions = TEXT_CONDITION_OPTIONS;
            } else if (type === SortOption.NUMBER) {
                this.conditionOptions = NUMBER_CONDITION_OPTIONS;
            } else if (type === SortOption.STATUS) {
                this.conditionOptions = STATUS_CONDITION_OPTIONS;
            }

            this.condition = this.conditionOptions[0];
        },
    },
};
</script>
