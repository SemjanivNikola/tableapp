<template>
  <div id="botuni">
    <h3 id="naslovprofile">Profile</h3>
    <br />
    <v-btn color="secondary" x-large rounded dark height="50px" width="150px">
      1 botun
    </v-btn>
    <v-btn color="secondary" x-large rounded dark height="50px" width="150px">
      2 botun
    </v-btn>
    <v-btn color="secondary" x-large rounded dark height="50px" width="150px">
      3 botun
    </v-btn>
    <div class="my-2">
      <v-btn color="secondary" x-large rounded dark>
        <br />
        <v-icon>mdi-pencil</v-icon>
        Edit
      </v-btn>
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
