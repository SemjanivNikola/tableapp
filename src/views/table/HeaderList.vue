<template>
    <thead>
        <header-list-item :item="{text: 'Placeholder', isShown: true}" />
        <header-list-item v-for="item in header" :key="item.id" :item="item" />
      </thead>
</template>
<script>
import HeaderListItem from "./HeaderListItem.vue";
export default {
    components: { HeaderListItem },
    name: "HeaderList",
    props: {
        header: {
            type: Array,
            required: true,
        },
    },
};
</script>
