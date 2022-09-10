<template>
    <div class="status-wrapper">
        <input
            @click="toggle"
            type="text"
            v-model="cellValue"
            :style="{
                backgroundColor: 'rgb(' + getColor + ')',
                cursor: 'pointer',
            }"
            readonly
        />
        <div v-if="shouldShowPicker" class="status-picker-wrapper">
            <div class="status-picker-inner">
                <div
                    v-for="item in status"
                    :key="item.id"
                    @click="setNewValue(item)"
                    class="color-box"
                    :style="{ backgroundColor: 'rgb(' + item.color + ')' }"
                >
                    <span>{{ item.value }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "StatusInput",
    props: {
        cell: {
            type: Object,
            required: true,
        },
    },
    data () {
        return {
            cellValue: null,
            shouldShowPicker: false,
            status: [
                { id: 1, value: "Backlog", color: "102, 51, 0" },
                { id: 2, value: "In Progress", color: "51, 153, 255" },
                { id: 3, value: "Need a review", color: "150, 74, 200" },
                { id: 4, value: "Done", color: "50, 205, 50" },
                { id: 5, value: "", color: "245, 245, 245" },
            ],
        };
    },
    created () {
        this.cellValue = this.cell.value;
    },
    methods: {
        toggle () {
            this.shouldShowPicker = !this.shouldShowPicker;
        },
        setNewValue (status) {
            // eslint-disable-next-line vue/no-mutating-props
            this.cellValue = status.value;
            this.shouldShowPicker = false;
        },
    },
    computed: {
        getColor () {
            const filtered = this.status.filter(
                (item) => item.value === this.cellValue,
            );
            return filtered[0].color;
        },
    },
};
</script>

<style scoped>
.status-wrapper {
    position: relative;
    color: #fff;
    padding: 4px;
}
.status-wrapper input,
.status-wrapper input:focus {
    border: none;
    outline: none;
}
.status-wrapper input {
    height: 20px;
    font-size: 12px;
    padding: 4px 8px;
    border-radius: 8px;
    color: #fff;
}
.status-picker-wrapper {
    position: absolute;
    top: 30px;
    left: 3px;
    width: 215px;
    padding: 8px;
    border-radius: 6px;
    background-color: #fff;
    z-index: 999;
}
.status-picker-inner {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 8px;
}
.color-box {
    font-size: 12px;
    text-transform: lowercase;
    padding: 4px 8px;
    border-radius: 20%;
    margin-bottom: 8px;
    cursor: pointer;
}
</style>
