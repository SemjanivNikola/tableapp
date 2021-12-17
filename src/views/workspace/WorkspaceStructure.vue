<template>
  <div class="structure-wrapper">
        <div class="input-group">
          <div id="container">
            <icon
              name="menu"
      	    />
            <input type="search" class="form-control rounded" placeholder="  Search" aria-label="Search" aria-describedby="search-addon" />
          </div>
          <div id="bar">
            <p>Structure</p>
            <icon
              name="add"
              class="add"
      	    />
          </div>
          <div id="structure">
            <icon
              name="file"
              class="file"
      	    />
          </div>
        </div>
    </div>
</template>


<script>
export default {
  name: "WorkspaceStructure",
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
</style>
