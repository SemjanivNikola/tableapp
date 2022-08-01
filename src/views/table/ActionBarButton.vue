<template>
  <div class="btn-container">
    <button
      class="button-wrapper"
      :class="getStatus"
      @click="toggleIsActive"
    >
      <!-- <span class="icon-placeholder" /> -->
      {{ title }}
    </button>
    <slot />
  </div>
</template>

<script>
export default {
    name: "Button",
    props: {
        title: {
            type: String,
            required: true,
        },
    },
    data () {
        return {
            isActive: false,
        };
    },
    computed: {
        getStatus () {
            return this.isActive ? "active" : "inactive";
        },
    },
    methods: {
        toggleIsActive () {
            console.log("yiis");
            this.isActive = !this.isActive;
            this.$emit("onPress");
        },
    },
};
</script>

<style scoped>
.btn-container {
    position: relative;
}
.icon-placeholder {
    width: 24px;
    height: 24px;
    margin-right: 8px;
}
.inactive {
    background-color: transparent;
    color: rgb(255, 255, 255);
    border: 1px solid var(--success);
}
.active {
    border: 1px solid transparent;
    background-color: rgb(101, 255, 218);
    color: rgb(0, 0, 0);
}
.inactive:hover {
  border-color: var(--info)
}
.button-wrapper {
    position: relative;
    padding: 4px 16px;
    border-radius: 4px;
    margin-right: 8px;
    transition: border-color 300ms ease-out;
}
</style>
