<template>
  <v-card id="view-wrapper-background">
    <v-tabs
      id="at-tabs"
      color="rgb(255, 255, 255)"
    >
      <v-tab class="at-tab">
        <tab-header

          :title="title"
        />
      </v-tab>
    </v-tabs>

    <table-view />
  </v-card>
</template>

<script>
import TabHeader from "../../components/TabHeader.vue";
import TableView from "../table/TableView.vue";

export default {
    name: "WorkspaceView",
    components: { TabHeader, TableView },
    props: {
        workspace: {
            type: Object,
            required: true,
        },
    },
    data () {
        return {
            title: "Naslov",
            shouldShowHome: true,

        };
    },
    mounted () {
        this.getWorkspace();
    },
    methods: {
        async getWorkspace () {
            const test = await this.$store.dispatch("workspace/getWorkspaceList");
            console.warn("TEST >> ", test);
        },
    },
};
</script>

<style>
#at-tabs .v-slide-group {
  background-color: var(--background-light-hard);
}
#view-wrapper-background {
  width: 100%;
  background-color: var(--background-dark-soft);
}

</style>
