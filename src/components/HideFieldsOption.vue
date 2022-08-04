<template>
  <div
    class="wrapper"
    :class="getStatus"
  >
    <div
      v-for="(header, index) in mockData.header"
      :key="header.id"
    >
      <v-switch
        v-model="header.isHidden"
        :label="header.text"
        dense
        color="green"
        @change="handleHideFields(index)"
      />
    </div>
  </div>
</template>

<script>
import tableData from "../../mock-data/grid_view_one.json";

export default {
    name: "ActionOptions",
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
            mockData: tableData,
        };
    },
    computed: {
        getStatus () {
            return this.isShown ? "show" : "hidden";
        },
    },
    methods: {
        handleHideFields (index) {
            if (!this.mockData.header[index].isHidden) {
                this.mockData.header[index].isHidden = true;
                this.mockData.options.hideFields.push(index);

                // If it's first field to be hidden add hide_fields option to summary
                if (!this.mockData.options.summary.includes("hide_fileds")) {
                    this.mockData.options.summary.push("hide_fileds");
                }
            } else this.mockData.header[index].isHidden = false;

            // If the last index is removed, remove the hide_fileds option
            if (this.mockData.options.hideFields.length === 0) {
                this.mockData.options.summary.splice(
                    this.mockData.options.summary.indexOf("hide_fileds"),
                    1,
                );
            }

            console.log("hideFields", this.mockData.options);
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
