<template>
  <div class="mainapp">
    <!-- 标题栏 -->
    <header class="mainapp-header">
      <h1>QianKun <div class="userinfo">主应用的state：{{ JSON.stringify(user) }}</div>
      </h1>
    </header>
    <div class="mainapp-main">
      <!-- 侧边栏 -->
      <ul class="mainapp-sidemenu">
        <li v-for="item in microApps"
            :class="{ active: item.activeRule === current }"
            :key="item.name"
            @click="goto(item)">
          {{ item.name }}
        </li>
      </ul>
      <!-- 子应用  -->
      <main id="subapp-viewport"></main>
    </div>
  </div>
</template>

<script>
import NProgress from "nprogress";
import microApps from "./micro-app";
import store from "@/store";
export default {
  name: "App",
  data() {
    return {
      isLoading: true,
      microApps,
      current: "/sub-vue/",
    };
  },
  computed: {
    user() {
      return store.getGlobalState("user");
    },
  },
  watch: {
    isLoading(val) {
      if (val) {
        NProgress.start();
      } else {
        this.$nextTick(() => {
          NProgress.done();
        });
      }
    },
  },
  components: {},
  methods: {
    goto(item) {
      history.pushState(null, item.activeRule, item.activeRule);
      // this.current = item.name
    },
    bindCurrent() {
      const path = window.location.pathname;
      if (this.microApps.findIndex((item) => item.activeRule === path) >= 0) {
        this.current = path;
      }
    },
    // 作用：主应用的菜单栏会高亮显示当前子应用，listenRouterChange是为了能监听到子路由的动作，主应用可以更新当前高亮哪一个子应用
    listenRouterChange() {
      const _wr = function (type) {
        const orig = history[type];
        return function () {
          const rv = orig.apply(this, arguments);
          const e = new Event(type);
          e.arguments = arguments;
          window.dispatchEvent(e);
          return rv;
        };
      };
      history.pushState = _wr("pushState");

      window.addEventListener("pushState", this.bindCurrent);
      window.addEventListener("popstate", this.bindCurrent);

      this.$once("hook:beforeDestroy", () => {
        window.removeEventListener("pushState", this.bindCurrent);
        window.removeEventListener("popstate", this.bindCurrent);
      });
    },
  },
  created() {
    this.bindCurrent();
    NProgress.start();
  },
  mounted() {
    this.listenRouterChange();
  },
};
</script>

<style lang="scss">
// 主应用慎用 reset 样式
body {
  margin: 0;
}

.mainapp {
  // 防止被子应用的样式覆盖
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC,
    Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  line-height: 1;
}

.active {
  color: red !important;
}

.mainapp-header {
  > h1 {
    color: #333;
    font-size: 36px;
    font-weight: 700;
    margin: 0;
    padding: 36px;
    display: flex;
    align-items: center;
    .userinfo {
      font-size: 14px;
      color: #333;
      padding-left: 40px;
    }
  }
}

.mainapp-main {
  display: flex;

  .mainapp-sidemenu {
    width: 130px;
    list-style: none;
    margin: 0;
    margin-left: 40px;
    margin-right: 30px;
    padding: 0;
    border-right: 2px solid #aaa;

    > li {
      color: #aaa;
      margin: 20px 0;
      font-size: 18px;
      font-weight: 400;
      cursor: pointer;

      &:hover {
        color: #444;
      }

      &:first-child {
        margin-top: 5px;
      }
    }
  }
}

// 子应用区域
#subapp-container {
  flex-grow: 1;
  position: relative;
  margin: 0 40px;

  .subapp-loading {
    color: #444;
    font-size: 28px;
    font-weight: 600;
    text-align: center;
  }
}
</style>
