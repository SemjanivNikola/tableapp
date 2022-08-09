<template>
  <div class="structure-wrapper">
    <div class="input-group">
      <div id="container">
        <icon
          name="menu"
          class="menu"
          :size="16"
          color="white"
        />
        <input
          type="search"
          class="form-control rounded"
          placeholder="  Search"
          aria-label="Search"
          aria-describedby="search-addon"
        >
      </div>
      <div id="bar">
        <p>Structure</p>
        <h3 style="color: white">{{title}}</h3>

        <icon
          name="add"
          class="add"
          :size="20"
          color="white"
        />
      </div>
      <div id="structure">
        <icon
          name="file"
          class="file"
          :size="16"
          color="white"
        />
      </div>
    </div>
    <ul>
          <li v-for="(table, index) in structure" :key="table.id">
            <a href="#" @click="selectItem(index)">{{table.title}}</a>
            <ul>
              <li v-for="(view, index) in table.view_list" :key="view.id">
                <a href="#" @click="selectItem(index)">{{view.title}}</a>
              </li>
            </ul>
          </li>
        </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "WorkspaceStructure",
    data () {
        return {
            search: "",
            title: this.$store.getters["workspace/getTitle"],
        };
    },
    computed: {
        ...mapState(["table"]),
        structure () {
            return this.table.map;
        },
    },
};
</script>

<style scoped>

.structure-wrapper {
  width: 18%;
}
.form-control{
  background-color: #211D43;
  color: white;
  width: 100%
}
#container {
  display: flex;
  padding: 5px;
}
#bar{
  color: white;
  text-decoration: underline;
  text-decoration-color:#6BD1FF;
  display: flex;
  align-items: flex-start;
  padding: 10px;
}
.add{
  margin-left: auto;
}
.file{
  display: flex;
  margin-right: 180px;
}
a {
  color: white;
  text-decoration: none;
}
</style>
