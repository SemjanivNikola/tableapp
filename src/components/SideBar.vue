SIDE BAR

<template>
  <v-sheet
    height="400"
    width="900"
    class="overflow-hidden"
    style="position: relative;"
  >
    <v-container class="fill-height">
      <v-row
        align="center"
        justify="center"
      >
        <v-btn
          color="pink"
          dark
          @click.stop="drawer = !drawer"
        >
          OPEN / CLOSE
        </v-btn>
      </v-row>
    </v-container>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >


      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
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
                { title: "(Home -) My Workspace", icon: "mdi-view-dashboard" },
                { title: "(About -) Recent Tables", icon: "mdi-animation" },
                { title: "Profile", icon: "mdi-account" },
            ],
        };
    },
};
</script>
