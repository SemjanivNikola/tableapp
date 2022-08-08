<template>
    <tr>
        <record-cell v-for="(cell, index) in record.cells" :key="index" :cell="cell" />
    </tr>
</template>

<script>
import RecordCell from "./RecordCell.vue";

export default {
    components: { RecordCell },
    name: "RecordListItem",
    props: {
        record: {
            type: Object,
            required: true,
        },
    },
};
</script>
