<template>
  <div class="structure-wrapper">
        <div class="input-group">
          <div id="container">
            <img src="@/assets/add.svg" alt="">
            <input type="search" class="form-control rounded" placeholder="  Search" aria-label="Search" aria-describedby="search-addon" />
          </div>
          <div id="structure">
            <p>Structure</p>
            <img src="@/assets/add.svg" alt="" class="icon">
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
#structure{
  color: white;
  text-decoration: underline;
  text-decoration-color:#6BD1FF; 
  display: flex;
  align-items: flex-start;
  padding: 10px;
}
.icon{
  margin-left: auto;
}

</style>
