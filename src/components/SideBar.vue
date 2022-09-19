<template>
  <v-sheet
    height="400"
    width="900"
    class="overflow-hidden"
    style="position: relative;"
  >
<v-navigation-drawer
      v-model="drawer"
      absolute
      permanent
    >
      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.path"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-sheet>
</template>

<script>
export default {
    data () {
        return {
            drawer: null,
            items: [
                { title: "My Workspace", path: "/myworkspace", icon: "mdi-view-dashboard" },
                { title: "Recent Tables", icon: "mdi-animation", path: "/recenttables" },
                { title: "Profile", icon: "mdi-account", path: "/profile" },
            ],
        };
    },
};
</script>
