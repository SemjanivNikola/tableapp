<template>
    <div
        class="dropdown-wrapper option-wrap"
        :class="{ show: isShown }"
        :style="{ paddingBottom: select.length === 0 ? `${8}px` : `${96}px` }"
    >
        <div style="padding: 8px">
            <h4>Sort by</h4>
            <p>
                After every change you make be sure to apply those changes.
                Otherwise it won't be visible.
            </p>
        </div>
        <div class="wrap-scroll option-wrapper">
            <div v-if="select.length === 0">
                <table-field-picker
                    :fields="getHeader"
                    :handle-field-pick="handleFieldPick"
                />
            </div>

            <div v-else>
                <sort-option-item
                    v-for="(item, index) in select"
                    :key="item.id"
                    :index="index"
                    :initial="item"
                    :fields="getHeader"
                    @onChange="handleChange"
                />
            </div>
        </div>

        <div v-if="select.length > 0" class="bottom-action">
            <v-row align="center" justify="space-between">
                <v-btn
                    @click="showPicker = !showPicker"
                    style="position: realtive"
                >
                    Add field
                </v-btn>
                <v-btn v-if="showPicker" @click="showPicker = false"
                    >Cancel</v-btn
                >
                <div
                    class="dropdown-wrapper option-wrap inside"
                    :class="{ show: showPicker }"
                >
                    <table-field-picker
                        v-if="showPicker"
                        :fields="getHeader"
                        :handle-field-pick="handleFieldPick"
                    />
                </div>
            </v-row>
            <div class="spacer-md"></div>
            <v-row align="center" justify="space-between">
                <v-btn @click="clearAll">Clear all</v-btn>
                <v-btn @click="handleSort"> Apply changes </v-btn>
            </v-row>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import SortOptionItem from "./SortOptionItem.vue";

const TableFieldPicker = {
    name: "table-field-picker",
    props: {
        fields: {
            type: Array,
            required: true,
        },
        handleFieldPick: {
            type: Function,
            required: true,
        },
    },
    template: `<div class="wrap-scroll field-picker-wrap"><div
        v-for="header in fields"
        :key="header.id"
        @click="handleFieldPick(header.id)"
        class="dropdown-item-wrap"
      >
      <button class="dropdown-item">
                    {{ header.text }}
                </button>
      </div></div>`,
};

export default {
    name: "SortOption",
    components: { SortOptionItem, TableFieldPicker },
    props: {
        isShown: {
            type: Boolean,
            required: true,
        },
    },
    data () {
        return {
            select: [],
            showPicker: false,
        };
    },
    computed: {
        ...mapGetters("view", ["getHeader"]),
        ...mapGetters({ optionList: "view/options/sortOptions" }),
    },
    watch: {
        optionList: {
            handler (val) {
                this.select = val;
            },
            deep: true,
        },
    },
    methods: {
        handleFieldPick (index) {
            this.$store.commit(
                "view/options/addSortOption",
                {
                    id: index,
                    direction: 1,
                },
                { root: true },
            );

            if (this.showPicker) {
                this.showPicker = false;
            }
        },
        handleChange (value) {
            this.$store.commit(
                "view/options/updateSortOption",
                {
                    index: value.index,
                    value: value.option,
                },
                { root: true },
            );
        },
        handleSort () {
            this.$store.dispatch("view/handleSort", this.select);
        },
        clearAll () {
            this.$store.dispatch("view/handleSortRemoveAll");
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
    padding-bottom: 96px;
}
.option-wrapper {
    position: relative;
    width: 440px;
    max-height: 280px;
    padding: 8px 8px 8px 8px;
}
p {
    margin: 0;
    font-size: 14px;
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

.dropdown-wrapper.option-wrap.inside {
    z-index: 100;
    top: 45px;
    left: 16px;
    padding: 0;
}
.option-wrap.inside .option-wrapper {
    width: 180px;
    max-height: 160px;
    padding: 8px;
}
.field-picker-wrap {
    width: 100%;
    padding-right: 8px;
}
</style>

