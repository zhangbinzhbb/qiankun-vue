
// 除了代码中暴露出相应的生命周期钩子之外，为了让主应用能正确识别微应用暴露出来的一些信息，
// 微应用的打包工具需要增加如下配置：
const { name } = require("../package.json");

module.exports = {
  publicPath: "/subapp/sub-vue-hash",
  transpileDependencies: ["common"],
  chainWebpack: config => config.resolve.symlinks(false),
  configureWebpack: {
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: "umd", // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`
    }
  },
  lintOnSave: process.env.NODE_ENV === "development",
  devServer: {
    port: process.env.VUE_APP_PORT,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    overlay: {
      warnings: false,
      errors: true
    }
  }
};
