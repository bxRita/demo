<template>
  <div class="wrap">
    <div class="content">
      <div class="sider" id="erStencil">sider</div>
      <div class="panel">
        <!--画板顶部工具栏-->
        <div class="toolbar">
          <tool-bar
            v-if="isReady"
            @change="changeGraph"
            @command="previewModel"
          />
        </div>
        <!--中间画板区-->
        <div class="x6-graph" id="erContainer">design</div>
      </div>
      <!--右侧属性栏-->
      <div class="config">
        <config-panel
          v-if="isReady"
          @selectNode="setSelectedNode"
          :fileName="fileName"
          :updateCellCB="updateCellCallBack"
        />
      </div>
    </div>
    <component
      :is="currentCom.name"
      v-if="currentCom.show"
      v-bind="currentCom.op"
      @cancel="cancelHandle"
    ></component>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import { Shape, FunctionExt } from '@antv/x6'
import store from '@/store'
import BaseGraph from '@/utils/graph'
import './index.less'
import { ComponentType, color, ToolCommand, X6CellType } from '@/config'
import ConfigPanel from '@/components/config-panel/index.vue'
const { Rect, Circle } = Shape
import { setCurrentGraph } from '@/utils/graphUtil'
import ToolBar from '@/components/X6Toolbar.vue'
import { getClassComponent, getEnumComponent } from '@/components/nodes'
import {
  getAllModel,
  deleteModel,
  createModel,
  updateModel
} from '@/api/er-model'
import { mapActions } from 'vuex'
import PreviewSchema from './preview-schema'
export default {
  name: 'BuildModel',
  inheritAttrs: false,
  components: {
    ConfigPanel,
    ToolBar
  },
  data() {
    return {
      bakDesignCells: [],
      currentCom: {
        name: null,
        show: false,
        op: {
          title: ''
        }
      },
      fileName: '',
      isReady: false,
      baseGraph: null, // 画布对象
      resizeFn: null, // 浏览器resize函数
      stencil: null, // 左侧组件区控件
      initScale: {
        // 画布初始比例大小
        sx: 1,
        sy: 1
      }
    }
  },
  mounted() {
    this.initGraph()
    this.initStencil()
    this.initResizeEvent()
    this.initGraphEvent()
    this.initGraphData()
    this.isReady = true
  },
  methods: {
    ...mapActions('erModel', [
      'initDesignCells',
      'bakServerCells',
      'setSelect',
      'updateCellById'
    ]),
    updateCellCallBack(cellData) {
      this.updateCellById(cellData)
    },
    cancelHandle() {
      this.currentCom.show = false
      this.currentCom.name = null
    },
    previewModel(command) {
      switch (command) {
        case ToolCommand.save:
          this.saveHandle()
          break
        case ToolCommand.preview:
          this.currentCom.name = PreviewSchema
          this.currentCom.show = true
          break
      }
    },
    setSelectedNode(cell) {
      this.setSelect(cell)
    },
    async saveHandle() {
      let graph = this.baseGraph.graph,
        pageData = graph.toJSON()
      const newCells = pageData.cells
      const preCells = this.bakDesignCells
      await this.doSaveAndUpdate(newCells, preCells)
      this.$message.success('Save Success')
      this.initGraphData()
    },
    /**
     * @description 点击保存 执行创建，更新，删除
     */
    async doSaveAndUpdate(newCells, oldCells) {
      const adds = []
      const updates = []
      const removes = []

      const newLen = newCells.length,
        oldLen = oldCells.length
      for (let i = 0; i < oldLen; i++) {
        let temp = oldCells[i]
        let isDel = newCells.findIndex(item => item.id === temp.id) === -1
        isDel && temp.shape != X6CellType.edge && removes.push(temp)
      }
      for (let i = 0; i < newLen; i++) {
        let temp = newCells[i]

        let isAdd = oldCells.findIndex(item => item.id === temp.id) === -1

        temp.shape != X6CellType.edge &&
          (isAdd ? adds.push(temp) : updates.push(temp))
      }
      console.log(adds, updates, removes)
      // // 删除
      removes.forEach(async item => {
        const busData = item?.bxDatas
        if (busData) {
          // 只有服务端保存的模型 才需要调服务接口
          await deleteModel({
            data: busData,
            filename: this.fileName,
            preview: false
          })
        }
      })
      // // 新增
      adds.forEach(async item => {
        const modelData = cloneDeep(item.bxDatas)
        let reqData = {
          data: Object.assign(modelData, {
            modelType: item.cellType,
            extends: {
              saveData: [item]
            }
          }),
          filename: this.fileName,
          preview: false
        }
        await createModel(reqData)
      })
      // 更新
      updates.forEach(async item => {
        const modelData = cloneDeep(item.bxDatas)
        const oldItem = oldCells.find(i => i.id === item.id)
        let preName = oldItem?.bxDatas?.modelName
        let reqData = {
          data: Object.assign(modelData, {
            oldModelName: preName,
            modelType: item.cellType,
            extends: {
              saveData: [item]
            }
          }),
          filename: this.fileName,
          preview: false
        }

        await updateModel(reqData)
      })
    },
    /**
     * @description 顶部操作区 操作界面后更新graph 数据到store
     */
    changeGraph() {
      let graph = this.baseGraph.graph,
        pageData = graph.toJSON()
      this.initDesignCells(pageData.cells)
    },
    getQueryVariable(variable) {
      let query = window.location.search.substring(1)
      let vars = query.split('&')
      for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=')
        if (pair[0] == variable) {
          return pair[1]
        }
      }
      return false
    },
    async initGraphData() {
      this.fileName = this.getQueryVariable('filename')
      let graph = this.baseGraph.graph
      let arrs = await getAllModel({
          filename: this.fileName
        }),
        len = arrs.length
      console.log('allModels :', arrs)
      let layoutData = {
        nodes: [],
        edges: []
      }
      if (len) {
        for (let i = 0; i < len; i++) {
          let temp = arrs[i],
            modelPosition = temp.modelPosition,
            busData = modelPosition.bxDatas,
            isTable = modelPosition.cellType === ComponentType.C
          layoutData.nodes.push(
            Object.assign(modelPosition, {
              isSaved: true, // 识别是否是服务端已保存的模型
              component: isTable ? getClassComponent() : getEnumComponent()
            })
          )
          if (isTable && busData) {
            let fieldsList = busData?.fieldsList,
              fLen = (fieldsList && fieldsList.length) || 0
            for (let i = 0; i < fLen; i++) {
              const field = fieldsList[i]
              field.extends && layoutData.edges.push(field.extends)
            }
          }
        }

        const cells = layoutData.nodes.concat(layoutData.edges)
        this.bakDesignCells = cloneDeep(cells)
        this.initDesignCells(cells)

        graph.fromJSON(layoutData)
      }
    },
    /**
     * 初始化设计界面的画布
     */
    initGraph() {
      const { width, height } = this.getContainerSize()
      /** 初始化画布 */
      this.baseGraph = new BaseGraph({
        container: document.getElementById('erContainer'),
        // 画布选择
        selecting: {
          enabled: true,
          multiple: true,
          rubberband: true,
          movable: true,
          showNodeSelectionBox: true
        },
        width,
        height,
        grid: {
          size: 10,
          visible: true
        },
        embedding: {
          enabled: true,
          findParent({ node }) {
            const bbox = node.getBBox()
            return this.getNodes().filter(node => {
              // 只有 data.parent 为 true 的节点才是父节点
              const data = node.getData()
              if (data && data.parent) {
                const targetBBox = node.getBBox()
                return bbox.isIntersectWithRect(targetBBox)
              }
              return false
            })
          }
        }
      })

      setCurrentGraph(this.baseGraph.graph)
    },
    /**
     * @description 绑定画布事件
     */
    initGraphEvent() {
      const { graph } = this.baseGraph
      const container = document.getElementById('erContainer')
      // 鼠标移入节点时，显示链接桩
      graph.on(
        'node:mouseenter',
        FunctionExt.debounce(() => {
          // const ports = container.querySelectorAll('.x6-port-body') // 展示链接桩
          // this.showPorts(ports, true)
        }),
        500
      )
      // 鼠标移出节点时，隐藏链接桩
      graph.on('node:mouseleave', () => {
        // const ports = container.querySelectorAll('.x6-port-body') // 隐藏链接桩
        // this.showPorts(ports, false)
      })

      graph.on('node:collapse', ({ node, e }) => {
        e.stopPropagation()
        node.toggleCollapse()
        const collapsed = node.isCollapsed()
        const cells = node.getDescendants()
        cells.forEach(n => {
          if (collapsed) {
            n.hide()
          } else {
            n.show()
          }
        })
      })

      graph.on('cell:added', ({ cell, index, options }) => {
        store.dispatch('erModel/addCell', cell.store.data)
      })
      // 删除节点快捷键绑定
      graph.bindKey(['del', 'backspace'], () => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
          graph.removeCells(cells)
        }
      })
      // 撤销
      graph.bindKey(
        ['ctrl+z'],
        e => {
          this.undo()
        },
        'keyup'
      )
      // 重置
      graph.bindKey(
        ['ctrl+y'],
        e => {
          this.redo()
        },
        'keyup'
      )
      graph.bindKey(['ctrl+plus'], e => this.scaleView(e, 'up'))
      graph.bindKey(['ctrl+-'], e => this.scaleView(e, 'down'))
    },
    /**
     * @description 画布放大缩小
     */
    scaleView(e, flag) {
      e.preventDefault()
      if (flag === 'up') {
        this.initScale.sx += 0.1
        this.initScale.sy += 0.1
      } else {
        this.initScale.sx -= 0.1
        this.initScale.sy -= 0.1
      }

      const { graph } = this.baseGraph
      graph.scale(this.initScale.sx, this.initScale.sy)
    },
    /**
     * @description 撤销
     */
    undo() {
      const { graph } = this.baseGraph
      graph.history.undo()
    },
    /**
     * @description 重做
     */
    redo() {
      const { graph } = this.baseGraph
      graph.history.redo()
    },
    /**
     * @description 显示连接桩
     */
    showPorts(ports, show) {
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = show ? 'visible' : 'hidden'
      }
    },
    /**
     * @description 初始化左侧组件区
     */
    initStencil() {
      this.stencil = this.baseGraph.initStencil(
        document.getElementById('erStencil')
      )
      // const { graph } = this.baseGraph
      const r1 = new Rect({
        width: 70,
        height: 40,
        attrs: {
          rect: { fill: color.blue, stroke: '#4B4A67', strokeWidth: 2 },
          text: { text: '实体类', fill: 'white' }
        },
        data: {
          type: ComponentType.C
        }
      })
      const r2 = new Rect({
        width: 70,
        height: 40,
        attrs: {
          rect: { fill: '#FE854F', stroke: '#4B4A67', strokeWidth: 2 },
          text: { text: '枚举', fill: 'white' }
        },
        data: {
          type: ComponentType.E
        }
      })

      const c = new Circle({
        width: 60,
        height: 60,
        attrs: {
          circle: { fill: '#31D0C6', strokeWidth: 2, stroke: '#4B4A67' },
          text: { text: '标量', fill: 'white' }
        },
        data: {
          type: ComponentType.S
        }
      })

      this.stencil.load([r1, r2], 'basic')
      // this.stencil.load([c], 'combination')
    },
    /**
     * @description 获取可视区的宽高
     */
    getContainerSize() {
      return {
        width: document.body.offsetWidth - 610,
        height: document.body.offsetHeight - 50
      }
    },
    /**
     * @description 监听resize事件
     */
    initResizeEvent() {
      this.resizeFn = () => {
        const { width, height } = this.getContainerSize()
        this.baseGraph.resize(width, height)
      }
      window.addEventListener('resize', this.resizeFn)
    }
  },
  /**
   * @description 组件销毁时
   */
  destroyed() {
    window.removeEventListener('resize', this.resizeFn)
  }
}
</script>

<style lang="less" scoped></style>
