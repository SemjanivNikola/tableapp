<template>
    <td :class="{ hidden: !cell.isShown }">
        <input :value="cell.value" type="text" :disabled="disabled" />
    </td>
</template>

<script>
export default {
    name: "RecordCell",
    props: {
        cell: {
            type: Object,
            required: true,
        },
        disabled: {
            type: Number,
            required: true,
        },
    },
};
</script>

<style scoped>
td:first-child {
    border-right: none;
}
td:first-child input[type="text"] {
    pointer-events: none;
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
