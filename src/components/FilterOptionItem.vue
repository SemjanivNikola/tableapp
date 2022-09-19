<template>
    <div class="option-item-wrap">
        <span v-if="logic === 'where'" class="base-logic">{{ logic }}</span>
        <v-select
            v-else
            v-model="logic"
            :items="LOGIC_CONDITION_OPTIONS"
            item-value="label"
            item-text="label"
            hide-details
            dense
            @change="onChange"
            class="select-input base-logic"
        />
        <div class="spacer-md"></div>
        <v-select
            v-model="field"
            :items="fields"
            item-value="id"
            label="Field title"
            hide-details
            dense
            @change="onChange"
            class="select-input"
        />
        <div class="spacer-md"></div>
        <v-select
            v-model="condition"
            :items="conditionOptions"
            item-value="label"
            item-text="label"
            hide-details
            dense
            @change="onChange"
            class="select-input"
        />
        <div class="spacer-md"></div>
        <v-text-field
            v-model="value"
            placeholder="Enter a value"
            @blur="onChange"
            hide-details
            dense
        />
        <div class="spacer-md"></div>
        <button @click="removeOption" class="remove-btn">x</button>
    </div>
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
const LOGIC_CONDITION_OPTIONS = [{ label: "and" }, { label: "or" }];

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
        index: {
            type: Number,
            required: true,
        },
    },
    data () {
        return {
            logic: this.initial.logic,
            field: this.initial.id,
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
    created () {
        if (this.initial.id) {
            this.selectSortOptByType(this.fields[this.initial.id - 1].type);
        } else {
            this.field = this.fields[0].id;
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
        onChange () {
            this.$emit("onChange", {
                index: this.index,
                option: {
                    logic: this.logic,
                    id: this.field,
                    condition: this.condition.label
                        ? this.condition.label
                        : this.condition,
                    value: this.value,
                },
            });
        },
        removeOption () {
            this.$store.dispatch("view/handleFilterOptionRemove", this.index, {
                root: true,
            });
        },
    },
};
</script>

<style scoped>
.option-item-wrap {
    display: flex;
    align-items: baseline;
    background-color: rgba(229, 229, 229, 0.46);
    padding: 8px 8px 16px 8px;
    border-radius: 6px;
    margin-bottom: 16px;
}
.option-item-wrap .select-input {
    max-width: 120px;
}
.remove-btn {
    width: 16px;
}
.base-logic {
    text-transform: capitalize;
    font-weight: 600;
}
.select-input.base-logic {
    text-transform: lowercase;
    max-width: 61px;
}
</style>
