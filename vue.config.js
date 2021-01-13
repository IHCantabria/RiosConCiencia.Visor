const StyleLintPlugin = require("stylelint-webpack-plugin");
const fs = require("fs");
module.exports = {
  chainWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      //Build PRO
      config.devtool("none");
    } else if (!process.env.WEBPACK_DEV_SERVER) {
      //BUILD DEV
      config.devtool("eval-source-map");
    } else {
      //LOCAL DEV
      config.devtool("source-map");
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
  devServer: {
    open: true,
    https: true,
    key: fs.readFileSync("./certificate/localhost-key.pem"),
    cert: fs.readFileSync("./certificate/localhost.pem")
  },
  configureWebpack: {
    plugins: [
      new StyleLintPlugin({
        fix: true,
        files: "src/**/*.{vue,htm,html,css,sass,less,scss}",
        formatter: () => {}
      })
    ]
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
        @import "@/styles/global-variables.scss";
        @import "@/styles/global-imports.scss";
        @import "@/styles/app.scss";
        @import "@/styles/layout.scss";
      `
      }
    }
  }
};
