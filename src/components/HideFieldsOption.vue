<template>
    <div class="dropdown-wrapper option-wrap" :class="{ show: isShown }">
        <div class="option-wrapper">
            <div
                v-for="(header, index) in getHeader"
                :key="header.id"
                class="option-item-wrap"
            >
                <v-switch
                    :input-value="header.isShown"
                    :label="header.text"
                    hide-details
                    dense
                    color="green"
                    @click="handleHideFields(index)"
                />
            </div>
        </div>

        <div class="bottom-action">
            <v-row align="center" justify="space-between">
                <v-btn class="btn" @click="handleAllToggle(true)"
                    >Show all</v-btn
                >
                <v-btn class="btn" @click="handleAllToggle(false)">
                    Hide all
                </v-btn>
            </v-row>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "HideFieldsOption",
    props: {
        optionType: {
            type: String,
            default: "switch-btn-list",
            required: false,
        },
        isShown: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        ...mapGetters("view", ["getHeader"]),
    },
    methods: {
        handleHideFields (index) {
            this.$store.dispatch("view/handleHideFields", index);
        },
        handleAllToggle (value) {
            this.$store.dispatch("view/handleHideFieldsAllToggle", value);
        },
    },
};
</script>

<style scoped>
.dropdown-wrapper.option-wrap {
    top: 31px;
    left: 2px;
    width: auto;
    height: auto;
}
.option-wrapper {
    position: relative;
    width: 270px;
    max-height: 430px;
    padding: 0 8px 76px 8px;
    overflow-y: scroll;
}
.option-wrapper .option-item-wrap {
    height: 25px;
}
.option-item-wrap:last-child:after {
    content: "";
    display: block;
    width: 100%;
    height: 24px;
    border-bottom: 1px solid rgb(229, 229, 229);
}
.bottom-action {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 8px 16px;
    background-color: #fff;
}
.bottom-action .row {
    margin: 0 !important;
}
</style>
