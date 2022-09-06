<template>
        <input :value="cell.value" type="date" class="c-input" />
</template>

<script>
export default {
    name: "DateInput",
    props: {
        cell: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style scoped>
td:first-child input.c-input{
    max-width: 65px;
    width: 65px;
}
td input.c-input {
    padding: 2px 4px;
}
input.c-input:focus {
    outline: var(--background-default) auto 1px;
}
</style>
