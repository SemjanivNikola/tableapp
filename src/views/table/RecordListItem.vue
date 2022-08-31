<template>
    <tr>
        <record-cell
            v-for="(cell, index) in record"
            :key="index"
            :cell="cell"
        />
    </tr>
</template>

<script>
import RecordCell from "./RecordCell.vue";

export default {
    components: { RecordCell },
    name: "RecordListItem",
    props: {
        record: {
            type: Array,
            required: true,
        },
    },
};
</script>
