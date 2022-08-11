<template>
    <tbody>
        <record-list-item v-for="record in recordList" :key="record.id" :record="record" />
        <tr class="new-record" @click="$emit('onRecordCreate')">
            <td colspan="100%">+ Add new record</td>
        </tr>
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

<style scoped>
.new-record {
    width: 100%;
    text-align: center;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.3);
}
td {
    padding-left: 8px;
    text-align: left;
    font-size: 14px;
    color: white;
    border: none;
}
</style>
