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
                <button class="btn" @click="handleDelete">Delete field</button>
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

        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Delete field</span>
                </v-card-title>
                <v-card-text>
                    Are you sure you want to delete this field?
                </v-card-text>
                <v-card-actions>
                    <v-spacer />
                    <v-btn color="blue darken-1" text @click="dialog = false">
                        Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="onDelete">
                        Delete
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
            dialog: false,
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
        handleDelete () {
            this.$store.commit("setActiveFieldOpt", null);
            this.shouldCustomizeField = false;
            this.dialog = true;
        },
        onDelete () {
            this.dialog = false;
            this.$store.dispatch("view/handleDeleteField", this.id);
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
