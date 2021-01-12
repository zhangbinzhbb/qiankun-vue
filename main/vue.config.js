module.exports = {
  lintOnSave: process.env.NODE_ENV === "development",
  devServer: {
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
  },
  transpileDependencies: ['common'], // Babel 显式转译列表
  chainWebpack: config => {
    config.plugin('html')
      .tap((args) => {
        args[0].title = 'qiankun-example'
        return args
      })
  }
}
