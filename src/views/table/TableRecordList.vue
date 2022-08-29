<template>
    <tbody>
        <record-list-item
            v-for="record in recordList"
            :key="record.id"
            :record="record"
        />
        <tr class="new-record">
            <td :colspan="headerLenght">
                <span class="indicator-wrapper" @click="$emit('onRecordCreate')"
                    ><span class="indicator">+</span></span
                >
            </td>
        </tr>
    </tbody>
</template>

<script>
import { mapGetters } from "vuex";
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
    computed: {
        ...mapGetters({ headerLenght: "view/getHeaderLength" }),
    },
};
</script>

<style scoped>
.new-record {
    width: 100%;
    text-align: center;
}
.new-record td {
    text-align: left;
    font-size: 14px;
    border: none;
    padding-bottom: 10px;
}
.new-record td .indicator-wrapper {
    position: relative;
    display: block;
    max-height: 24px;
    height: 24px;
    background-color: rgba(229, 229, 229, 0.358);
    cursor: pointer;
}
.indicator-wrapper .indicator {
    position: absolute;
    top: 10px;
    left: 16px;
    display: flex;
    width: 24px;
    height: 24px;
    align-items: center;
    justify-content: center;
    padding: 2px;
    background-color: rgba(229, 229, 229, 1);
    color: #000;
    border-radius: 50%;
    z-index: 10;
}
</style>
