<template>
    <div id="bar">
        <button @click="toggleShouldShowOptions">
            <icon name="chevron-down" :size="20" />
        </button>
        <div class="dropdown-wrapper" :class="{ show: shouldShowOptions }">
            <div class="dropdown-item-wrap" @click="onClick('workspace')">
                <button class="dropdown-item">+ Add workspace</button>
            </div>
            <div class="dropdown-item-wrap" @click="onClick('table')">
                <button class="dropdown-item">+ Add table</button>
            </div>
            <div class="dropdown-item-wrap" @click="onClick('view')">
                <button class="dropdown-item">+ Add view</button>
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
            shouldShowOptions: false,
        };
    },
    methods: {
        onClick (value) {
            this.shouldShowOptions = false;
            this.onCreate(value);
        },
        toggleShouldShowOptions () {
            this.shouldShowOptions = !this.shouldShowOptions;
        },
    },
};
</script>

<style scoped>
#bar {
    position: relative;
    display: flex;
    align-items: center;
}
</style>
