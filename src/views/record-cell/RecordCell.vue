<template>
    <td :class="{ hidden: !cell.isShown }">
        <component v-if="cell.type" :is="component" :cell="cell" />
        <div v-else style="padding-left: 8px;">{{cell.value}}</div>
    </td>
</template>

<script>
import FIELD_TYPE from "../../types/FieldType";

export default {
    name: "RecordCell",
    props: {
        cell: {
            type: Object,
            required: true,
        },
    },
    data () {
        return {
            component: null,
            FIELD_TYPE,
        };
    },
    created () {
        if (this.cell.type) {
            this.component = FIELD_TYPE[this.cell.type - 1].def;
        }
    },
    components: {
        "single-line-text": () => import("./SingleLineTextInput"),
        "multiline-text": () => import("./MultilineTextInput"),
        "number": () => import("./NumberInput"),
        "status": () => import("./SingleLineTextInput"), //
        "checkbox": () => import("./CheckboxInput"),
        "select-input": () => import("./SingleLineTextInput"), //
        "date-input": () => import("./DateInput"),
        "email": () => import("./EmailInput"),
        "duration": () => import("./SingleLineTextInput"), //
        "created-at": () => import("./SingleLineTextInput"), //
        "modified-at": () => import("./SingleLineTextInput"), //
        "link-to-another-table": () => import("./LinkToAnotherTable"), //
    },
};
</script>

<style scoped>
td:first-child {
    border-right: none;
}
td {
    border-right: 1px solid rgb(229, 229, 229);
    border-bottom: 1px solid rgb(229, 229, 229);
    color: black;
}
td.hidden {
    display: none;
}
</style>
