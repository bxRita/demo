<template>
  <a-layout>
    <a-layout-header>
      <top-menu :datas="datas"></top-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="48" :style="sideStyle">
        <left-nav @change="changeModel"></left-nav>
      </a-layout-sider>
      <a-layout-content>
        <router-view />
      </a-layout-content>
    </a-layout>
    <a-layout-footer>Footer</a-layout-footer>
  </a-layout>
</template>

<script>
import { ModelType } from '@/config'
import LeftNav from './nav'
import TopMenu from './top-menu'
export default {
  name: 'Home',
  inheritAttrs: false,
  components: {
    LeftNav,
    TopMenu
  },
  data() {
    return {
      sideStyle: {
        height: ''
      },
      // 模块 一级菜单对应的二级菜单
      modelMenu: {
        [ModelType.ModelManager]: [
          {
            title: '模块定制'
          },
          {
            title: '内置模块'
          },
          {
            title: '外部集成'
          },
          {
            title: '功能清单'
          }
        ],
        [ModelType.ShowApp]: [
          {
            title: '登录页面'
          },
          {
            title: '应用布局'
          }
        ],
        [ModelType.ResourceManager]: [
          {
            title: '资源管理'
          }
        ],
        [ModelType.BuildPage]: [
          {
            title: '页面构建'
          }
        ],
        [ModelType.BusinessModel]: [
          {
            title: '业务建模'
          },
          {
            title: '数据管理'
          },
          {
            title: '业务集成'
          },
          {
            title: '交互查询'
          },
          {
            title: '事件任务'
          }
        ]
      },
      // 一级菜单默认类型
      defaultModelType: ModelType.ModelManager,
      // 二级菜单数据源
      datas: []
    }
  },
  watch: {
    $route(newVal, oldVal) {
      if (newVal && newVal !== oldVal) {
        this.datas = this.modelMenu[newVal.name]
      }
    }
  },
  created() {},
  mounted() {
    this.initResizeEvent()
    // 初始化 顶部二级菜单
    this.datas = this.modelMenu[this.defaultModelType]
  },
  methods: {
    /**
     * @description 切换左侧图标菜单
     */
    changeModel(type) {},
    /**
     * @description 获取可视区的宽高
     */
    getContainerSize() {
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      }
    },
    /**
     * @description 监听resize事件
     */
    initResizeEvent() {
      this.resizeFn = () => {
        const { width, height } = this.getContainerSize()
        let h = height - 62
        this.sideStyle.height = `${h}px`
      }

      this.resizeFn()
      window.addEventListener('resize', this.resizeFn)
    }
  }
}
</script>

<style lang="less" scoped>
.ant-layout {
  .ant-layout-header {
    background: #40a9ff;
    height: 30px;
    line-height: 30px;
    color: #fff;
  }
  .ant-layout.ant-layout-has-sider {
    .ant-layout-sider.ant-layout-sider-dark {
      min-height: 200px;
      background: none;
      border-right: 1px solid #e4e4e4;
    }
  }
  .ant-layout-footer {
    padding: 5px;
    border-top: 1px solid #e4e4e4;
  }
}
</style>
