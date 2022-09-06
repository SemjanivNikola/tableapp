<template>
    <tr>
        <record-cell
            v-for="(cell, index) in record"
            :key="index"
            :cell="cell"
            @onIndexSave="handleIndexSave(index)"
        />
    </tr>
</template>

<script>
import RecordCell from "../record-cell/RecordCell.vue";

export default {
    components: { RecordCell },
    name: "RecordListItem",
    props: {
        record: {
            type: Array,
            required: true,
        },
    },
    methods: {
        handleIndexSave (index) {
            this.$store.commit("updateCellCoordinates", { type: "cell", index: index });
            this.$emit("onIndexSave");
        },
    },
};
</script>
