<template>
  <div class="action-bar-wrapper padding-small">
    <div class="bar-inner-wrapper">
      <action-bar-button
        title="Hide fields"
        @onPress="handleHideFields"
      >
        <hide-fields-option
          :is-shown="shouldShowOptions1"
        />
      </action-bar-button>

      <action-bar-button
        title="Sort"
        @onPress="handleSort"
      >
        <sort-option
          :is-shown="shouldShowOptions2"
        />
      </action-bar-button>

      <action-bar-button
        title="Filter"
        @onPress="handleFilter"
      >
        <!-- <action-options
          :is-shown="shouldShowOptions3"
          option-type="condition-list"
        /> -->
      </action-bar-button>

      <action-bar-button
        title="Share View"
        @onPress="handleShareView"
      >
        <!-- <action-options
          :is-shown="shouldShowOptions4"
          option-type="modal"
        /> -->
      </action-bar-button>

      <action-bar-button
        title="Trash"
        @onPress="handleTrash"
      >
        <modal :is-shown="shouldShowOptions5">
          <view-trash @close="shouldShowOptions5 = false" />
        </modal>
      </action-bar-button>
    </div>
    <div>
      <div>
        <v-text-field
          v-model="searchFiled"
          label="Search table"
          :loading="isSearching"
          hide-details="true"
          color="white"
          dark
          dense
        >
          <v-icon
            slot="append"
            color="white"
          >
            mdi-plus
          </v-icon>
        </v-text-field>
      </div>
    </div>
  </div>
</template>

<script>
import ActionBarButton from "./ActionBarButton.vue";
import HideFieldsOption from "@/components/HideFieldsOption.vue";
import SortOption from "@/components/SortOption.vue";
import ViewTrash from "@/components/ViewTrash.vue";
import Modal from "@/components/Modal.vue";

export default {
    name: "Template",
    components: { ActionBarButton, HideFieldsOption, SortOption, ViewTrash, Modal },
    data () {
        return {
            title: "Hide fields",
            isSearching: false,
            searchFiled: "",
            shouldShowOptions1: false,
            shouldShowOptions2: false,
            shouldShowOptions3: false,
            shouldShowOptions4: false,
            shouldShowOptions5: false,
        };
    },
    methods: {
        closeAllOptions () {
            this.shouldShowOptions1 = false;
            this.shouldShowOptions2 = false;
            this.shouldShowOptions3 = false;
            this.shouldShowOptions4 = false;
            this.shouldShowOptions5 = false;
        },
        handleHideFields () {
            if (!this.shouldShowOptions1) {
                this.closeAllOptions();
                this.shouldShowOptions1 = !this.shouldShowOptions1;
            } else {
                this.closeAllOptions();
            }
            console.log("Hide fields");
        },
        handleSort () {
            if (!this.shouldShowOptions2) {
                this.closeAllOptions();
                this.shouldShowOptions2 = !this.shouldShowOptions2;
            } else {
                this.closeAllOptions();
            }
            console.log("Sort");
        },
        handleFilter () {
            if (!this.shouldShowOptions3) {
                this.closeAllOptions();
                this.shouldShowOptions3 = !this.shouldShowOptions3;
            } else {
                this.closeAllOptions();
            }
            console.log("Filter");
        },
        handleShareView () {
            if (!this.shouldShowOptions4) {
                this.closeAllOptions();
                this.shouldShowOptions4 = !this.shouldShowOptions4;
            } else {
                this.closeAllOptions();
            }
            console.log("Sharing view");
        },
        handleTrash () {
            if (!this.shouldShowOptions5) {
                this.closeAllOptions();
                this.shouldShowOptions5 = !this.shouldShowOptions5;
            } else {
                this.closeAllOptions();
            }
            console.log("Trash >> ", this.shouldShowOptions5);
        },
    },

};
</script>

<style>
.action-bar-wrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    border-bottom: 2px solid var(--background-light-hard);

}
.bar-inner-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
</style>
