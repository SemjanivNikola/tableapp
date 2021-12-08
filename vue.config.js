module.exports = {
  transpileDependencies: [
    "vuetify",
  ],
  configureWebpack: {
    devtool: "source-map",
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: "@import \"@/styles/variables.scss\";",
      },
    },
  },
};
