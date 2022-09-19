<template>
  <div id="botuni">
    <h3 id="naslovprofile">Profile</h3>
    <br />
    <div class="my-2">
      <v-btn
      color="rgb(84, 108, 227)"
      x-large
      rounded
      dark>
        <br />
        <v-icon>mdi-pencil</v-icon>
        Edit
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
    name: "ProfileScreen",
};
</script>

<style>
#naslovprofile {
  font-size: 35px;
  color: aliceblue;
}
#botuni {
  color: aliceblue;
  border: 20px;
  margin: 40px;
}
</style>
