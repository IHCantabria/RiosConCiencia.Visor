module.exports = {
  chainWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      config.devtool("none");
    } else {
      config.devtool("eval-source-map");
    }
    config.plugin("define").tap(definitions => {
      definitions[0]["process.env"]["VERSION"] = JSON.stringify(
        require("./package.json").version
      );
      return definitions;
    });
  },
  outputDir: process.env.VUE_APP_DEPLOY_DIR,
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      sass: {
        // to import global variables && styles
        prependData: `
          @import "@/styles/global-variables.scss";
          @import "@/styles/global-imports.scss";
          @import "@/styles/app.scss";
          @import "@/styles/layout.scss";
        `
      }
    }
  },
  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {}
  }
};
