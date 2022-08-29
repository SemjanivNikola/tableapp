<template>
    <th :class="{ hidden: !item.isShown, placeholder: isPlaceholder }">
        <span v-if="!isPlaceholder" class="header-text">{{ item.text }}</span>
        <div class="spacer-md display-inline"></div>
        <div class="spacer-sm display-inline"></div>
        <div class="spacer-sm display-inline"></div>
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
    position: relative;
    padding: 8px 0;
    min-width: 160px;
    text-align: center;
    border-right: 1px solid rgb(229, 229, 229);
    border-top: 1px solid rgb(229, 229, 229);
    border-bottom: 1px solid rgb(229, 229, 229);
}
th.placeholder {
    min-width: 65px;
    width: 65px;
    border-right: none;
}
th.hidden {
    display: none;
}
th span.header-text {
    font-size: 14px;
    font-weight: 400;
}
.display-inline {
    display: inline-block !important;
}
</style>
