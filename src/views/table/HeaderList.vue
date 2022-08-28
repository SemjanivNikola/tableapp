<template>
    <thead>
        <tr>
            <header-list-item :item="{ isShown: true }" is-placeholder />
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
