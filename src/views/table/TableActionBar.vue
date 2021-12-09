<template>
  <div class="action-bar-wrapper padding-small">
    <div class="bar-inner-wrapper">
      <action-bar-button
        title="Hide fields"
        @onPress="handleHideFields"
      />
      <action-bar-button
        title="Sort"
        @onPress="handleSort"
      />
      <action-bar-button
        title="Filter"
        @onPress="handleFilter"
      />
      <action-bar-button
        title="Share View"
        @onPress="handleShareView"
      />
      <action-bar-button
        title="Trash"
        @onPress="handleTrash"
      />
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
export default {
  name: "Template",
  components: { ActionBarButton },
  data () {
    return {
      title: "Hide fields",
      isSearching: false,
      searchFiled: "",
    };
  },
  methods: {
    handleHideFields () {
      console.log("Hide fields");
    },
    handleSort () {
      console.log("Sort");
    },
    handleFilter () {
      console.log("Filter");
    },
    handleShareView () {
      console.log("Sharing view");
    },
    handleTrash () {
      console.log("Trash");
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
