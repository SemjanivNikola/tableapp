<template>
  <div
    class="mask"
    :class="getStatus"
  >
    <div class="wrapper">
      <div class="container">
        <!-- HEADER -->
        <div class="header">
          <slot name="header">
            Default header
          </slot>
        </div>

        <!-- BODY -->
        <div class="body">
          <slot name="body">
            Default body
          </slot>
        </div>

        <!-- FOOTER -->
        <div class="footer">
          <slot name="footer">
            Default footer
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "Modal",
    props: {
        isShown: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        getStatus () {
            return this.isShown ? "show" : "hidden";
        },
    },
};
</script>

<style scoped>
.mask {
    position: fixed;
    display: table;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    transition: opacity 0.3s ease;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.container {
  max-width: 950px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}
.header h3 {
  margin-top: 0;
  color: #42b983;
}

.body {
  margin: 20px 0;
}
.mask.show {
    display: block;
}
.mask.hidden {
    display: none;
}
</style>
