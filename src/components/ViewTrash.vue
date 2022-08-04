<template>
  <div class="flex-row justify-between">
    <div class="flex-row">
      <h3>
        Sort by
      </h3>
      <div class="spacer-md" />
      <p>Restore items deleted from workspace in past seven days</p>
    </div>
    <div class="flex-row">
      <button class="btn btn-fill">
        Empty trash
      </button>
      <div class="spacer-md" />
      <button
        class="btn"
        @click="$emit('close')"
      >
        X
      </button>
    </div>
  </div>
</template>

<script>
// import tableData from "../../mock-data/table_one.json";

export default {
    name: "ViewTrash",
};
</script>

<style scoped>
p {
  margin: 0;
}
.flex-row {
  display: flex;
  align-items: center;
}
.justify-between {
  justify-content: space-between;
}
.spacer-md {
  height: 16px;
  width: 16px;
}
.btn {
  padding: 8px;
  cursor: pointer;
}
.btn-fill {
  background-color: #DCDCDC;
}
</style>
