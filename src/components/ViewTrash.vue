<template>
  <div class="relative">
    <div class="header">
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

    <!-- FOOTER -->
    <div class="footer">
      <div class="footer-inner">
        <div class="icon">
          <svg
            viewBox="0 0 24 24"
          >
            <path
              fill="#696969"
              d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
            />
          </svg>
        </div>
        <p>This is your base trash for deleted records, blocks, fields, view and tables. For deleted bases and workspaces, see your workspace trash.</p>
      </div>
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
.relative {
    position: relative;
    min-height: inherit;
}
p {
  margin: 0;
}
.flex-row, .header, .footer-inner {
  display: flex;
  align-items: center;
}
.header {
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid #DCDCDC;
}
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  padding-top: 16px;
  border-top: 1px solid #DCDCDC;
}
.footer-inner {
  padding: 8px;
   background-color: #DCDCDC;
   border-radius: 6px;
}
.footer-inner .icon {
  width: 22px;
  height: 22px;
  margin-right: 16px;
}
.footer-inner p {
  font-size: 14px;
  color: #696969;
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
