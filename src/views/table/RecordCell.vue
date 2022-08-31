<template>
    <td :class="{hidden: !cell.isShown}">{{cell.value}}</td>
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
td {
  min-width: 120px;
  border: 1px solid #fff;
  color: white;
}
td.hidden {
  display: none;
}
</style>
