<template>
  <div style="overflow-x: scroll; padding: 0 50px 16px 0">
    <table>
      <header-list :header="tableHeader" />
      <table-record-list
        :record-list="getRecordList"
        @onRecordCreate="onRecordCreate"
      />
    </table>

    <modal-wrapper :is-shown="isRecordExpandShown">
      <record-expand
        :fields="tableHeader"
        @close="isRecordExpandShown = false"
      />
    </modal-wrapper>
  </div>
</template>

<script>
import HeaderList from "./HeaderList.vue";
import ModalWrapper from "@/components/ModalWrapper.vue";
import RecordExpand from "./RecordExpand.vue";
import TableRecordList from "./TableRecordList.vue";

export default {
    name: "TableView",
    components: {
        HeaderList,
        TableRecordList,
        ModalWrapper,
        RecordExpand,
    },
    data () {
        return {
            tableHeader: [],
            isRecordExpandShown: false,
        };
    },
    created () {
        this.tableHeader = this.$store.getters["view/getHeader"];
    },
    methods: {
        onRecordCreate () {
            this.isRecordExpandShown = true;
        },
    },
};
</script>

<style scoped>
table {
  border-collapse: collapse;
}
.new-col-wrapper {
  display: inline-block;
  width: 56px;
  height: 20px;
  background-color: gray;
  color: black;
}
</style>
