<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
    </div>
    <Tag msg="我是来自 sub-vue 组件Tag" />
    <router-view />
  </div>
</template>

<script>
export default {
  components: {
    Tag: async () => {
      if (window.commonComponents.Tag) return window.commonComponents.Tag;

      const app = window.loadMicroApp({
        name: "sub-vue",
        entry: "http://localhost:7777",
        container: "#subapp-viewport",
        props: { data: { commonComponents: window.commonComponents } },
      });

      await app.mountPromise;
      console.log(window.commonComponents);
      console.log(app);
      // app.unmount(); 不能卸载，卸载时会去掉样式的
      return window.commonComponents.Tag;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
