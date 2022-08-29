<template>
    <th class="field-placeholder">
        <span @click="toggleShouldShowOptions">+</span>

        <div class="dropdown-wrapper" :class="{ show: shouldShowOptions }">
            <div
                v-for="type in FIELD_TYPE"
                :key="type.id"
                @click="selectField(type)"
                class="dropdown-item-wrap"
            >
                <button class="dropdown-item">
                    {{ type.name }}
                </button>
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
            this.selectedType = { fieldType: field.id, type: field.type };
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
    border: 1px solid rgb(229, 229, 229);
}
th.field-placeholder span {
    display: block;
    width: 100%;
    height: 100%;
    cursor: pointer;
}
th.field-placeholder div.dropdown-wrapper {
    top: 32px;
    right: 35px;
    left: unset;
    height: 270px;
    min-width: 190px;
}
</style>
