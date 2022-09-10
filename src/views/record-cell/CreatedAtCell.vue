<template>
    <div class="status-wrapper">
        {{cellValue}}
    </div>
</template>

<script>
export default {
    name: "CreatedAtCell",
    props: {
        cell: {
            type: Object,
            required: true,
        },
    },
    data () {
        return {
            cellValue: null,
        };
    },
    created () {
        const date = new Date(this.cell.value);

        this.cellValue = date.toLocaleString("hr-HR");
    },
};
</script>

<style scoped>
.status-wrapper {
    position: relative;
    font-size: 14px;
    padding: 4px;
    margin: 0 2px;
    background-color: rgb(229, 229, 229);
}
</style>
