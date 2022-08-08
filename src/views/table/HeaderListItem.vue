<template>
    <th :class="{hidden: !item.isShown}">{{ item.text }}</th>
</template>
<script>
export default {
    name: "HeaderListItem",
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style scoped>
th {
  border: 1px solid #fff;
  color: white;
}
th.hidden {
  display: none;
}
</style>
