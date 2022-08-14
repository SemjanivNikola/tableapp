<template>
    <th :class="{ hidden: !item.isShown }">
        <span>{{ item.text }}</span>

        <more-field-options
            v-if="!isPlaceholder"
            :id="item.id"
            :title="item.text"
            :type="item.fieldType"
        />
    </th>
</template>
<script>
import MoreFieldOptions from "./ MoreFieldOptions.vue";

export default {
    name: "HeaderListItem",
    components: { MoreFieldOptions },
    props: {
        item: {
            type: Object,
            required: true,
        },
        isPlaceholder: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style scoped>
th {
    border: 1px solid #fff;
}
th.hidden {
    display: none;
}
</style>
