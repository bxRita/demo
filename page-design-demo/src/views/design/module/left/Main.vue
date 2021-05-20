<!--
  FilePath: \src\views\design\module\left\Main.vue
  Project: page-design-demo
  CreatedAt: 2021-05-20 14:49:12
  CreatedBy: ABC (<you@you.you>)
  Copyright: (c) 2021
  Task: #1
  Write a description of the code here.
-->
<template>
  <div class="left-main" :style="contentStyle">
    <menu-list :menus="menus"></menu-list>
  </div>
</template>

<script>
import MenuData from './mock/menu.json'
import MenuList from './MenuList'
export default {
  name: 'LeftMain',
  inheritAttrs: false,
  props: {
    contentStyle: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    MenuList
  },
  data() {
    return {
      menus: []
    }
  },
  created() {},
  mounted() {
    this.menus = MenuData
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.left-main {
  overflow-y: auto;
  ::v-deep .ant-menu.ant-menu-root {
    .ant-menu-item {
      span {
        font-size: 14px;
      }
    }

    .ant-menu-submenu {
      .ant-menu-submenu-title {
        span {
          font-size: 14px;
        }
      }
      ul.ant-menu {
        padding-left: 5px;
      }
    }
  }
}
</style>
