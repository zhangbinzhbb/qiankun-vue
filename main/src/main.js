import Vue from "vue";
import App from "./App.vue";

// qiankun 导入
import { registerMicroApps, start, setDefaultMountApp } from "qiankun";

import microApps from "./micro-app";
import "nprogress/nprogress.css";

Vue.config.productionTip = false;

const instance = new Vue({
  render: h => h(App)
}).$mount("#app");

// 定义loader方法，loading改变时，将变量赋值给App.vue的data中的isLoading
function loader(loading) {
  if (instance && instance.$children) {
    // instance.$children[0] 是App.vue，此时直接改动App.vue的isLoading
    instance.$children[0].isLoading = loading;
  }
}

// 给子应用配置加上loader方法
const apps = microApps.map(item => {
  return {
    ...item,
    loader
  };
});

/**
 * 注册application
 * @param {Array<RegistrableApp>} apps 必选，微应用的一些注册信息
 * @param {Object|Function<Promise>} lifeCycles 可选，全局的微应用生命周期钩子
 */

registerMicroApps(apps, {
  beforeLoad: app => {
    console.log("before load app.name====>>>>>", app.name);
  },
  beforeMount: [
    app => {
      console.log("[LifeCycle] before mount %c%s", "color: green;", app.name);
    }
  ],
  afterMount: [
    app => {
      console.log("[LifeCycle] after mount %c%s", "color: green;", app.name);
    }
  ],
  afterUnmount: [
    app => {
      console.log("[LifeCycle] after unmount %c%s", "color: green;", app.name);
    }
  ]
});

setDefaultMountApp("/sub-vue");
start();
