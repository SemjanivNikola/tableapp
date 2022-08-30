<template>
    <div
        class="dropdown-wrapper option-wrap"
        :class="{ show: isShown }"
    >
        <div class="wrap-scroll option-wrapper">
            <div v-if="this.filterList.length === 0" class="empty-text">
                <p>No filter conditions are applied to this view</p>
            </div>

            <div v-else>
                <filter-option-item
                    v-for="(item, index) in filterList"
                    :key="item.id"
                    :index="index"
                    :initial="item"
                    :fields="getHeader"
                    @onChange="handleChange"
                />
            </div>
        </div>

        <div class="bottom-action">
            <v-row align="center" justify="space-between">
                <v-btn @click="addFilter">+ Add condition</v-btn>
                <v-btn @click="handleFilter" :disabled="this.filterList.length === 0">Apply changes</v-btn>
            </v-row>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import FilterOptionItem from "./FilterOptionItem.vue";

export default {
    name: "FilterOption",
    components: { FilterOptionItem },
    props: {
        isShown: {
            type: Boolean,
            required: true,
        },
    },
    data () {
        return {
            filterList: [],
            showPicker: false,
        };
    },
    computed: {
        ...mapGetters("view", ["getHeader"]),
        ...mapGetters({ optionList: "view/options/filterOptions" }),
    },
    watch: {
        optionList: {
            handler (val) {
                this.filterList = val;
            },
            deep: true,
        },
    },
    methods: {
        addFilter () {
            this.$store.commit(
                "view/options/addFilterOption",
                {
                    logic: this.filterList.length === 0 ? "where" : "and",
                    field: null,
                    condition: null,
                    value: "",
                },
                { root: true },
            );
        },
        handleChange (value) {
            this.$store.commit(
                "view/options/updateFilterOption",
                {
                    index: value.index,
                    value: value.option,
                },
                { root: true },
            );
        },
        handleFilter () {
            this.$store.dispatch("view/handleFilter", this.filterList);
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
    width: 640px;
    max-height: 330px;
    padding: 8px 8px 56px 8px;
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
.empty-text {
    padding-top: 16px;
}
</style>
