<!--
  FilePath: \src\views\design\index.vue
  Project: page-design-demo
  CreatedAt: 2021-04-06 16:40:55
  CreatedBy: ABC (<you@you.you>)
  Copyright: (c) 2021
  Task: #1
  Write a description of the code here.
-->
<template>
  <a-layout>
    <!-- <a-layout-header>header</a-layout-header> -->
    <a-layout class="content">
      <a-layout-sider class="left">
        <left-main
          :contentStyle="contentStyle"
          @menu-change="menuChangeHandle"
        ></left-main>
      </a-layout-sider>
      <a-layout-content :style="contentStyle">
        <operate-area
          :showToolbarsText="showToolbarsText"
          :toolbars="toolbars"
          @handleSave="handleSave"
          @handlePreview="handlePreview"
          @handleOpenImportJsonModal="handleOpenImportJsonModal"
          @handleOpenCodeModal="handleOpenCodeModal"
          @handleOpenJsonModal="handleOpenJsonModal"
          @handleReset="resetDesignPanel"
          @handleClose="handleClose"
        ></operate-area>
        <design-panel
          :designData="designData"
          :selectItem="selectItem"
        ></design-panel>
      </a-layout-content>
      <a-layout-sider width="350" class="right">
        <right-main :currentSelectItem="currentItem"></right-main>
      </a-layout-sider>
    </a-layout>
    <!-- <a-layout-footer>copy right@2021</a-layout-footer> -->
  </a-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import './index.less'
import OperateArea from './module/OperateArea.vue'
import DesignPanel from './module/DesignPanel.vue'
import RightMain from './module/right/Main.vue'
import LeftMain from './module/left/Main.vue'
import { cloneDeep } from 'lodash'
import { StoreModel, MenuType, DEFAULT_PAGE_DATA } from '@/constants'
import qs from 'qs'
export default {
  name: 'PageDesign',
  inheritAttrs: false,
  components: {
    OperateArea,
    LeftMain,
    RightMain,
    DesignPanel
  },
  props: {
    showToolbarsText: {
      type: Boolean,
      default: false
    },
    toolbars: {
      type: Array,
      default: () => [
        'save',
        'preview',
        'exportJson',
        'exportCode',
        'reset',
        'close'
      ]
    }
  },
  data() {
    return {
      selectItem: {
        key: ''
      },
      contentStyle: {
        height: '300px'
      },
      currentPageInfo: ''
    }
  },
  computed: {
    ...mapGetters(StoreModel.design, ['pageData', 'currentSelectItem']),
    designData() {
      return cloneDeep(this.pageData)
    },
    currentItem() {
      let curItem = this.currentSelectItem
      return cloneDeep(curItem)
    }
  },
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions(StoreModel.design, ['resetDesignPanel', 'initPageData']),
    /**
     * @description 左侧菜单树 切换触发事件
     */
    menuChangeHandle(menuItem) {
      const { type, url } = menuItem
      if (type == MenuType.internal) {
        // 内部链接
        this.getPageInfoById(url || `1`)
      } else {
        // 外部跳转链接
        window.open(url)
      }
      console.log(menuItem)
    },
    async getPageInfoById(url) {
      let res = await this.$http({
        method: 'get',
        url: `/page/find/${url}`
      })
      this.currentPageInfo = res
      this.initPageData(
        res.content ? JSON.parse(res.content) : DEFAULT_PAGE_DATA
      )
    },
    init() {
      const clientH = document.body.clientHeight,
        contentH = clientH - 3

      this.contentStyle.height = `${contentH}px`
    },
    async saveDataToLocal() {
      let cloneData = cloneDeep(this.pageData)
      // 保存的数据中 删除右侧属性栏options的配置项
      const handleOption = list => {
        list.forEach(l => {
          if (l.subProp) {
            handleOption(l[l.subProp])
          }
          if (l.list) {
            handleOption(l.list)
          }
          if (l.options) delete l.options
        })
      }

      handleOption(cloneData.list)
      // 将处理后的数据 保存到localstorage中
      const reqData = Object.assign({}, this.currentPageInfo, {
        content: JSON.stringify(cloneData)
      })
      await this.$http({
        method: 'PUT',
        url: 'page/update',
        data: qs.stringify({ id: 1, content: '222' })
      })
    },
    handleSave() {
      this.saveDataToLocal()
      this.$message.success('保存成功')
    },
    handlePreview() {
      this.saveDataToLocal()
      // 打开预览界面
      window.open('/preview')
    },
    handleOpenImportJsonModal() {},
    handleOpenCodeModal() {},
    handleOpenJsonModal() {},
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.ant-layout {
  .ant-layout-header {
    background: none;
  }
  .ant-layout.ant-layout-has-sider {
    main {
      margin: 0 8px 0;
      box-shadow: 0px 0px 1px 1px #ccc;
      border-bottom: 1px solid #ccc;
    }
    .ant-layout-sider {
      background: none;
      box-shadow: 0px 0px 1px 1px #ccc;
      background: #fff;
    }
    .left,
    .right {
      height: 100%;
      overflow: auto;
    }
  }
}
</style>
