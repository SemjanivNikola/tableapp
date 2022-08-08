<template>
  <v-card id="view-wrapper-background">
    <v-tabs
      id="at-tabs"
      color="rgb(255, 255, 255)"
    >
      <v-tab class="at-tab">
        <tab-header
          v-for="header in tabHeaderList"
          :key="header.id"
          :header="header"
        />
      </v-tab>
    </v-tabs>
    <h1 v-if="isError" style="color: white">ERROR! View id -> {{errorData}} </h1>
    <div v-else>
      <h1 v-if="isLoading" style="color: white">LOADING</h1>

      <table-view v-else />
    </div>
  </v-card>
</template>

<script>
import TabHeader from "../../components/TabHeader.vue";
import TableView from "../table/TableView.vue";

export default {
    name: "WorkspaceTable",
    components: { TabHeader, TableView },
    data () {
        return {
            shouldShowHome: true,
            tabHeaderList: [],
            errorData: null,
            isLoading: true,
            isError: false,
        };
    },
    created () {
        this.tabHeaderList = this.$store.getters["table/getMap"];
        const viewId = this.$store.getters["table/getSelectedViewId"];
        if (viewId) {
            this.readViewById(viewId);
        } else {
            this.isError = true;
        }
    },
    methods: {
        readViewById (id) {
            this.isLoading = true;

            this.$store.dispatch("view/readView", id, { root: true }).then(() => {
                this.isLoading = false;
            }).
                catch((error) => {
                    this.isError = true;
                    this.isLoading = false;
                    this.errorData = error.message;
                });
        },
    },
};
</script>

<style>
#at-tabs .v-slide-group {
  background-color: var(--background-light-hard);
}
#view-wrapper-background {
  width: 80%;
  background-color: var(--background-dark-soft);
}

</style>
