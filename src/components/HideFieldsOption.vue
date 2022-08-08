<template>
  <div
    class="wrapper"
    :class="getStatus"
  >
    <div
      v-for="(header, index) in headerList"
      :key="header.id"
    >
      <v-switch
        :input-value="header.isShown"
        :label="header.text"
        dense
        color="green"
        @click="handleHideFields(index)"
      />
    </div>
  </div>
</template>

<script>
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
    data () {
        return {
            headerList: [],
        };
    },
    computed: {
        getStatus () {
            return this.isShown ? "show" : "hidden";
        },
    },
    created () {
        const { header } = this.$store.getters["view/get"];
        this.headerList = header;
    },
    methods: {
        handleHideFields (index) {
            this.$store.dispatch("view/handleHideFields", index);
        },
    },
};
</script>

<style scoped>
.wrapper {
    position: absolute;
    top: 28px;
    left: 2px;
    width: 360px;
    height: 430px;
    background-color: #fff;
    overflow-x: hidden;
    overflow-y: scroll;
    z-index: 9999;
}
.wrapper.show {
    display: block;
}
.wrapper.hidden {
    display: none;
}
</style>
