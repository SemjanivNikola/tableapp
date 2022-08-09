<template>
  <div id="bar">
    <p>Structure</p>
    <div class="btn-container">
      <button @click="isAddNewOpen = !isAddNewOpen">
        <icon name="add" :size="20" color="white" />
      </button>
      <div class="dropdown-wrapper" :class="getIsAddNewOpen">
        <div class="dropdown-item" @click="onCreate('workspace')">+ Add workspace</div>
        <div class="dropdown-item" @click="onCreate('table')">+ Add table</div>
        <div class="dropdown-item" @click="onCreate('grid view')">+ Add view</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "StructureAction",
    props: {
        onCreate: {
            type: Function,
            required: true,
        },
    },
    data () {
        return {
            isAddNewOpen: false,
        };
    },
    computed: {
        getIsAddNewOpen () {
            return this.isAddNewOpen ? "show" : "hidden";
        },
    },
};
</script>

<style scoped>
#bar {
  color: white;
  text-decoration: underline;
  text-decoration-color: #6bd1ff;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
}
.btn-container {
  position: relative;
}
.dropdown-wrapper {
  position: absolute;
  top: 20px;
  left: 4px;
  min-width: 180px;
  padding-bottom: 8px;
  background-color: purple;
  border-radius: 6px;
  overflow-x: hidden;
  overflow-y: scroll;
  z-index: 9999;
}
.dropdown-wrapper.show {
  display: block;
}
.dropdown-wrapper.hidden {
  display: none;
}
.dropdown-item {
  padding: 8px 16px;
  border-bottom: 1px solid #211d43;
  transition: all 300ms ease-out;
  cursor: pointer;
}
.dropdown-item:hover {
  background-color: #6bd1ff;
}
</style>
