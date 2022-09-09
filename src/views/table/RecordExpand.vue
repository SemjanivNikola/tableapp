<template>
    <div class="relative">
        <div class="header">
            <h3>Create new record</h3>
            <button class="btn" @click="$emit('close')">X</button>
        </div>

        <!-- BODY -->
        <div class="body-wrapper">
            <v-row v-for="(cell, index) in newRecord" :key="index" align="center">
                <v-col>
                    <p>{{ fields[index].text }}</p>
                </v-col>
                <v-col>
                    <div class="component-wrapper">
                        <component :is="getComponent(cell.type)" :cell="cell" />
                    </div>
                </v-col>
            </v-row>
        </div>

        <!-- FOOTER -->
        <div class="footer">
            <v-btn @click="create">Crete</v-btn>
        </div>
    </div>
</template>

<script>
import FIELD_TYPE from "../../types/FieldType";

export default {
    name: "RecordExpand",
    props: {
        fields: {
            type: Array,
            required: true,
        },
        record: {
            type: Array,
            required: false,
            default: () => [],
        },
    },
    data () {
        return {
            component: null,
            newRecord: [],
            FIELD_TYPE,
        };
    },
    created () {
        this.newRecord = this.record;
    },
    methods: {
        getComponent (type) {

            return FIELD_TYPE[type - 1].def;
        },
        create () {
            const { length } = this.$store.getters["view/getRecordList"];
            this.newRecord.splice(0, 0, { value: length + 1, isShown: true });
            console.warn("new record >> ", this.newRecord);
        },
    },
    components: {
        "single-line-text": () => import("../record-cell/SingleLineTextInput"),
        "multiline-text": () => import("../record-cell/MultilineTextInput"),
        number: () => import("../record-cell/NumberInput"),
        status: () => import("../record-cell/SingleLineTextInput"), //
        checkbox: () => import("../record-cell/CheckboxInput"),
        "select-input": () => import("../record-cell/SingleLineTextInput"), //
        "date-input": () => import("../record-cell/DateInput"),
        email: () => import("../record-cell/EmailInput"),
        duration: () => import("../record-cell/SingleLineTextInput"), //
        "created-at": () => import("../record-cell/SingleLineTextInput"), //
        "modified-at": () => import("../record-cell/SingleLineTextInput"), //
        "link-to-another-table": () => import("../record-cell/LinkToAnotherTable"), //
    },
};
</script>

<style scoped>
.relative {
    position: relative;
    min-height: inherit;
    padding: 0 32px;
}
p {
    margin: 0;
}
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: end;
    margin: 0 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid #dcdcdc;
}
.body-wrapper {
    max-height: 375px;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 8px 16px;
}
.component-wrapper {
    border: 1px solid rgb(229, 229, 229);
}
div.component-wrapper input.c-input {
    max-width: 100% !important;
    width: 100% !important;
    padding: 4px 0;
}
.footer {
    width: 100%;
    padding-top: 8px;
    padding-right: 16px;
    background-color: #fff;
    text-align: end;
}
</style>
