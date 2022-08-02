module.exports = {
    runtimeCompiler: true,
    transpileDependencies: [
        "vuetify",
    ],
    configureWebpack: {
        devtool: "source-map",
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: "@import \"@/src/scss/variables.scss\";",
            },
        },
    },
};
