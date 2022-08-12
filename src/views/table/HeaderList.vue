<template>
    <thead>
        <tr>
            <header-list-item :item="{ text: 'Placeholder', isShown: true }" />
            <header-list-item
                v-for="item in header"
                :key="item.id"
                :item="item"
            />
            <create-field />
        </tr>
    </thead>
</template>

<script>
import CreateField from "./CreateField.vue";
import HeaderListItem from "./HeaderListItem.vue";

export default {
    components: { HeaderListItem, CreateField },
    name: "HeaderList",
    props: {
        header: {
            type: Array,
            required: true,
        },
    },
};
</script>

<style scoped>
th {
    min-width: 120px;
    text-align: center;
    border: 1px solid #fff;
    color: white;
}
</style>
