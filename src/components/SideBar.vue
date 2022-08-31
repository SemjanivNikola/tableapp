SIDE BAR

<template>
    <div>
        <v-navigation-drawer
            class="deep-purple accent-4"
            dark
            permanent
            height="595px"
        >
            <v-list>
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

            <template v-slot:append>
                <div class="pa-2">
                    <v-btn block> Sign out </v-btn>
                </div>
            </template>
        </v-navigation-drawer>
    </div>
</template>

<script>
export default {
    data () {
        return {
            drawer: true,
            items: [
                {
                    title: "My Workspace",
                    icon: "mdi-view-dashboard",
                    path: "/my_workspace",
                },
                {
                    title: "Recent Tables",
                    icon: "mdi-animation-outline",
                    path: "/recent_tables",
                },
                {
                    title: "Profile",
                    icon: "mdi-account-tie ",
                    path: "/profile",
                },
            ],
        };
    },
};
</script>

