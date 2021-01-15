import { loadMicroApp } from '../../es';

import Vue from "vue";
import App from "./App.vue";

// qiankun 导入
import { loadMicroApp } from "qiankun";

Vue.config.productionTip = false;

const instance = new Vue({
  render: h => h(App)
}).$mount("#app");

loadMicroApp(
  {
    name: 'app',
   	entry: '//localhost:7777/subapp/sub-vue/',
    container: '#yourContainer',
  }
);
