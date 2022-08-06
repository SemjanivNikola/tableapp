<template>
  <div class="header-wrapper" :class="isSelected">
    <h5>{{ header.table_name }}</h5>
    <icon
      name="close"
      :size="16"
    />
  </div>
</template>

<script>
export default {
    name: "TabHeader",
    props: {
        header: {
            type: Object,
            required: true,
        },
    },
    computed: {
        isSelected () {
            const selected = this.$store.getters["table/isTableSelected"];
            return selected(this.header.id) ? "selected" : "";
        },
    },
};
</script>

<style scoped>
.header-wrapper {
  width: 100%;
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: none;
}
.header-wrapper.selected {
  background-color: red;
}
.close {
  position: relative;
  width: 16px;
  height: 16px;
  z-index: 100;
  line-height: 15px;
  border-radius: 2px;
  transition: all 300ms ease-out;
}
.close:hover {
  background-color: var(--secondary-light);
}
</style>
