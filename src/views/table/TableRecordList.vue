<template>
    <tbody>
        <record-list-item v-for="record in recordList" :key="record.id" :record="record" />
      </tbody>
</template>

<script>
import RecordListItem from "./RecordListItem.vue";

export default {
    components: { RecordListItem },
    name: "TableRecordList",
    props: {
        recordList: {
            type: Array,
            required: true,
        },
    },
};
</script>
