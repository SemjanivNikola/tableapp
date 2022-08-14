<template>
    <th class="field-placeholder">
        <span @click="toggleShouldShowOptions">+</span>

        <div class="wrapper" :class="{ show: shouldShowOptions }">
            <div
                v-for="type in FIELD_TYPE"
                :key="type.id"
                @click="selectField(type)"
            >
                <p style="color: black">{{ type.name }}</p>
            </div>

            <button class="btn" @click="createField" :disabled="!selectedType">
                Create
            </button>
        </div>
    </th>
</template>

<script>
import FIELD_TYPE from "../../types/FieldType";

export default {
    name: "CreateField",
    data () {
        return {
            shouldShowOptions: false,
            selectedType: null,
            FIELD_TYPE,
        };
    },
    methods: {
        selectField (field) {
            this.selectedType = { id: field.id, type: field.type };
        },
        async createField () {
            const res = await this.$store.dispatch(
                "view/createField",
                this.selectedType,
            );
            if (res) {
                this.selectedType = null;
                this.shouldShowOptions = false;
            }
        },
        toggleShouldShowOptions () {
            this.shouldShowOptions = !this.shouldShowOptions;
        },
    },
};
</script>

<style scoped>
th.field-placeholder {
    position: relative;
    min-width: 120px;
    text-align: center;
    border: 1px solid #fff;
    color: white;
    cursor: pointer;
}
.wrapper {
    display: none;
    position: absolute;
    top: 28px;
    left: 2px;
    height: 430px;
    background-color: #fff;
    overflow-x: hidden;
    overflow-y: scroll;
    z-index: 9999;
}
.wrapper.show {
    display: block;
}
</style>
