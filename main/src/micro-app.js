import store from "./store";

const microApps = [
  {
    name: "sub-vue", // app name registered
    entry: process.env.VUE_APP_SUB_VUE,
    activeRule: "/sub-vue"
  },
  {
    name: "sub-vue-hash",
    entry: process.env.VUE_APP_SUB_VUE_HASH,
    activeRule: "/sub-vue-hash"
  },
  {
    name: "sub-react",
    entry: process.env.VUE_APP_SUB_REACT,
    activeRule: "/sub-react"
  }
];


// 处理组件共享
const commonComponents = {};

const apps = microApps.map(item => {
  return {
    ...item,
    container: "#subapp-viewport", // 子应用挂载的div
    props: {
      routerBase: item.activeRule, // 下发基础路由
      getGlobalState: store.getGlobalState, // 下发getGlobalState方法
      data: { commonComponents }
    }
  };
});

export default apps;
