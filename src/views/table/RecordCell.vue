<template>
    <td :class="{ hidden: !cell.isShown }">{{ cell.value }}</td>
</template>

<script>
export default {
    name: "RecordCell",
    props: {
        cell: {
            type: Object,
            required: true,
        },
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
