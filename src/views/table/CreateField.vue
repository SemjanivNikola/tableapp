<template>
    <th class="field-placeholder">
        <span @click="toggleShouldShowOptions">+</span>

        <div class="dropdown-wrapper" :class="{ show: shouldShowOptions }">
            <div class="wrap-scroll">
                <div
                    v-for="type in FIELD_TYPE"
                    :key="type.id"
                    @click="selectField(type)"
                    :class="[{ selected: selectedField === type.id}, 'dropdown-item-wrap']"
                >
                    <button class="dropdown-item">
                        {{ type.name }}
                    </button>
                </div>

                <div class="spacer-md"></div>

                <v-btn @click="createField" :disabled="!selectedType">
                    Create
                </v-btn>
            </div>
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
            selectedField: null,
            FIELD_TYPE,
        };
    },
    methods: {
        selectField (field) {
            this.selectedField = field.id;
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
}
th.field-placeholder .dropdown-wrapper .wrap-scroll {
    height: 270px;
    min-width: 190px;
}
th.field-placeholder div.dropdown-wrapper .dropdown-item-wrap.selected {
     background-color: rgba(4, 217, 57, 0.511);
}
</style>
