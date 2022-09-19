<template>
    <div id="botuni">
        <h3 id="naslovrecenttables">Recent Tables</h3>
        <br />
        <router-link :to="{ path: '/recenttables/A' }">
        <v-btn
            color="rgb(255, 0, 0)"
            x-large
            rounded
            dark
            height="50px"
            width="150px"
        >
            A
        </v-btn>
        </router-link>
        <router-link :to="{ path: '/recenttables/B' }">
        <v-btn
            color="rgb(51, 204, 51)"
            x-large
            rounded
            dark
            height="50px"
            width="150px"
        >
            B
        </v-btn>
        </router-link>
        <router-link :to="{ path: '/recenttables/C' }">
        <v-btn
            color="rgb(51, 153, 255)"
            x-large
            rounded
            dark
            height="50px"
            width="150px"
        >
            C
        </v-btn>
        </router-link>
        <div class="my-2">
            <v-btn
            color="secondary"
            x-large
            rounded
            dark
            fab>
            <br />
            <v-icon>mdi-plus-circle-outline</v-icon>
            </v-btn>
        </div>
        <div id="back">
        <router-link :to="{ path: '/workspace=2' }">
        <v-btn
            color="secondary"
            x-large
            rounded
            dark
            height="50px"
            width="150px"
        >
            Back
        </v-btn>
        </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "RecentTables",
};
</script>

<style>
#naslovrecenttables {
    font-size: 35px;
    color: aliceblue;
}
#botuni {
    color: aliceblue;
    border: 20px;
    margin: 40px;
}
</style>
