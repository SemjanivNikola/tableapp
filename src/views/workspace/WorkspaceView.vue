<template>
  <v-card class="view-wrapper-background">
    <v-tabs>
      <v-tab>
        <tab-header :title="title" />
      </v-tab>
    </v-tabs>
  </v-card>
</template>

<script>
import TabHeader from "../../components/TabHeader.vue";

export default {
  name: "WorkspaceView",
  components: { TabHeader },
  data () {
    return {
      title: "Naslov",
    };
  },
};
</script>

<style scoped>

.view-wrapper-background {
  background-color: var(--primary);
}
</style>
