<template>
    <div class="container">
        <span @click="showOptions">+</span>

        <div class="wrapper" :class="{ show: shouldShowOptions }">
            <div v-if="!shouldCustomizeField">
                <button
                    class="btn"
                    @click="shouldCustomizeField = !shouldCustomizeField"
                >
                    Customize field type
                </button>
                <button class="btn" @click="onDelete">Delete field</button>
            </div>

            <div v-else>
                <v-text-field v-model="name" />
                <v-select
                    v-model="selectedType"
                    :items="FIELD_TYPE"
                    item-value="id"
                    item-text="name"
                />

                <button class="btn" @click="onCancel">Cancel</button>
                <button class="btn" @click="submit" :disabled="!isValueChanged">
                    Save
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import FIELD_TYPE from "../../types/FieldType";

export default {
    name: "MoreFieldOptions",
    props: {
        id: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        type: {
            type: Number,
            required: true,
        },
    },
    data () {
        return {
            name: "",
            selectedType: null,
            shouldCustomizeField: false,
            FIELD_TYPE,
        };
    },
    created () {
        this.setToDefault();
    },
    methods: {
        async submit () {
            const res = await this.$store.dispatch(
                "view/updateField",
                this.selectedType,
            );
            if (res) {
                this.setToDefault();
            }
        },
        selectField (field) {
            this.selectedType = { id: field.id, type: field.type };
        },
        showOptions () {
            this.$store.commit("setActiveFieldOpt", this.id);
        },
        onCancel () {
            this.$store.commit("setActiveFieldOpt", null);
            this.setToDefault();
        },
        setToDefault () {
            this.name = this.title;
            this.selectedType = this.FIELD_TYPE.filter(
                (type) => type.id === this.type,
            )[0].id;
            this.shouldCustomizeField = false;
        },
        onDelete () {
            this.$store.dispatch("view/deleteField", this.id);
        },
    },
    computed: {
        ...mapGetters(["getActiveFieldOpt"]),
        shouldShowOptions () {
            if (this.getActiveFieldOpt) {
                return this.getActiveFieldOpt === this.id;
            }
            return false;
        },
        isValueChanged () {
            return this.name !== this.title || this.selectedType !== this.type;
        },
    },
};
</script>

<style scoped>
.container {
    position: relative;
    width: 22px;
    overflow: visible;
    cursor: pointer;
}
.wrapper {
    display: none;
    position: absolute;
    top: 28px;
    left: 2px;
    width: 230px;
    background-color: #fff;
    overflow-x: hidden;
    overflow-y: scroll;
    z-index: 9999;
}
.wrapper.show {
    display: block;
}
.btn {
    display: block;
    color: #000;
}
</style>
