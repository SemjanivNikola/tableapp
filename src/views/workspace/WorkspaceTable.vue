<template>
  <v-card id="view-wrapper-background">
    <h1 v-if="isError">ERROR! View id is {{errorData}} </h1>
    <div v-else>
      <h1 v-if="isLoading">LOADING</h1>

      <table-view v-else />
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import TableView from "../table/TableView.vue";

export default {
    name: "WorkspaceTable",
    components: { TableView },
    data () {
        return {
            shouldShowHome: true,
            errorData: null,
            isLoading: true,
            isError: false,
        };
    },
    computed: {
        ...mapGetters({ viewId: "table/getSelectedViewId" }),
    },
    methods: {
        readViewById (id) {
            this.isLoading = true;

            this.$store.dispatch("view/readView", id, { root: true }).then(async () => {
                this.isLoading = !await this.$store.dispatch("view/handleBodyModification");
            }).
                catch((error) => {
                    this.isError = true;
                    this.isLoading = false;
                    this.errorData = error.message;
                });
        },
    },
    watch: {
        viewId (val) {
            this.readViewById(val);
        },
    },
    created () {
        if (this.viewId) {
            this.readViewById(viewId);
        } else {
            this.isError = true;
        }
    },
};
</script>

<style>
#at-tabs .v-slide-group {
  background-color: var(--background-light-hard);
}
#view-wrapper-background {
  width: 500px;
  flex-grow: 1;
  flex-shrink: 0;
  background: inherit;
}

</style>
