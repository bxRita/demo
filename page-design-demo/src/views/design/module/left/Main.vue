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
    <menu-list :menus="menus" @menuSelected="menuSelectedHandle"></menu-list>
  </div>
</template>

<script>
import { getLeftMenus } from '@/api/design'
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
      menuArr: [], // 服务端 菜单 原始数据
      menus: []
    }
  },
  created() {},
  mounted() {
    this.menus = MenuData
    this.getMenuDataFromServer()
  },
  methods: {
    menuSelectedHandle(args) {
      const { key } = args
      const res = this.menuArr.find(item => item.id == key)
      this.$emit('menu-change', res)
    },
    /**
     * @description 从服务端获取菜单数据
     */
    async getMenuDataFromServer() {
      const res = await getLeftMenus()
      this.menuArr = res
      try {
        this.menus = this.transArr2Tree(res)
      } catch (e) {
        // 服务异常使用mock服务数据
        this.menus = MenuData
      }
    },
    /**
     * @description 将数组 转化成 页面可用的树形结构
     */
    transArr2Tree(arr) {
      let len = arr.length,
        result = [],
        mapObj = {}
      // 将数组中数据转为键值对结构 (这里的数组和obj会相互引用)
      arr.map(item => {
        mapObj[item.id] = item
      })
      // 执行转换
      for (let i = 0; i < len; i++) {
        const temp = arr[i]
        const { parentId } = temp
        if (!parentId) {
          result.push(temp)
          continue
        }

        if (mapObj[parentId].children) {
          mapObj[parentId].children.push(temp)
        } else {
          mapObj[parentId].children = [temp]
        }
      }
      return result
    }
  }
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
