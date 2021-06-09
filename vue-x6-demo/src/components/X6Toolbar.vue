<!--
  FilePath: \src\components\X6Toolbar.vue
  Project: vue-x6-demo
  CreatedAt: 2021-04-01 10:02:26
  CreatedBy: bx (<you@you.you>)
  Copyright: (c) 2021
  Task: #1
  Write a description of the code here.
-->
<template>
  <div class="bar">
    <a-tooltip placement="bottom">
      <template #title>
        <span>清除 (Cmd + D)</span>
      </template>
      <a-button
        name="delete"
        @click="handleClick"
        class="item-space"
        size="small"
        icon="delete"
      >
      </a-button>
    </a-tooltip>

    <a-tooltip placement="bottom">
      <template #title>
        <span>撤销 (Cmd + Z)</span>
      </template>
      <a-button
        :disabled="!canUndo"
        name="undo"
        @click="handleClick"
        class="item-space"
        size="small"
        icon="undo"
      >
      </a-button>
    </a-tooltip>

    <a-tooltip placement="bottom">
      <template #title>
        <span>Redo (Cmd + Shift + Z)</span>
      </template>
      <a-button
        :disabled="!canRedo"
        name="redo"
        @click="handleClick"
        class="item-space"
        size="small"
        icon="redo"
      >
      </a-button>
    </a-tooltip>

    <!-- 自定义button begin -->
    <a-tooltip placement="bottom" v-for="(btn, idx) in customBtns" :key="idx">
      <template #title>
        <span>{{ btn.tip }}</span>
      </template>
      <a-button
        :name="btn.name"
        @click="handleClick"
        class="item-space"
        size="small"
        :icon="btn.icon"
      >
        {{ btn.label }}
      </a-button>
    </a-tooltip>
    <!-- 自定义button end -->
  </div>
</template>

<script>
import { getCurrentGraph } from '@/utils/graphUtil'
import { DataUri } from '@antv/x6'
import { ToolCommand } from '@/config'
export default {
  name: 'Index',
  components: {},
  data() {
    return {
      canUndo: '',
      canRedo: '',
      graph: getCurrentGraph(),
      customBtns: [
        {
          tip: '复制 (Cmd + Shift + Z)',
          name: 'copy',
          icon: 'copy',
          label: ''
        },
        {
          tip: '剪切 (Cmd + X)',
          name: 'cut',
          icon: 'scissor',
          label: ''
        },
        {
          tip: '粘贴 (Cmd + V)',
          name: 'paste',
          icon: 'snippets',
          label: ''
        },
        {
          tip: 'Schema预览',
          name: ToolCommand.preview,
          icon: 'eye',
          label: ''
        },
        {
          tip: '保存PNG (Cmd + S)',
          name: 'savePNG',
          icon: 'download',
          label: 'png'
        },
        {
          tip: '保存SVG (Cmd + S)',
          name: 'saveSVG',
          icon: 'download',
          label: 'svg'
        },
        {
          tip: '打印 (Cmd + P)',
          name: 'print',
          icon: 'printer',
          label: ''
        },
        {
          tip: '导出 (Cmd + P)',
          name: 'toJSON',
          icon: '',
          label: 'toJSON'
        },
        {
          tip: '保存',
          name: ToolCommand.save,
          icon: 'save',
          label: '保存'
        },
        {
          tip: '部署',
          name: ToolCommand.sync,
          icon: 'sync',
          label: '部署'
        },
        {
          tip: '查看日志',
          name: ToolCommand.log,
          icon: 'file-search',
          label: 'Log'
        }
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      this.initEvent()
    }, 200)
  },
  methods: {
    initEvent() {
      const { history } = this.graph
      history.on('change', () => {
        this.canUndo = history.canUndo()
        this.canRedo = history.canRedo()
      })
      this.graph.bindKey('ctrl+z', () => {
        if (history.canUndo()) {
          history.undo()
        }
        return false
      })
      this.graph.bindKey('ctrl+shift+z', () => {
        if (history.canRedo()) {
          history.redo()
        }
        return false
      })
      this.graph.bindKey('ctrl+d', () => {
        this.graph.clearCells()
        return false
      })
      this.graph.bindKey('ctrl+s', () => {
        this.graph.toPNG(datauri => {
          DataUri.downloadDataUri(datauri, 'chart.png')
        })
        return false
      })
      this.graph.bindKey('ctrl+p', () => {
        this.graph.printPreview()
        return false
      })
      this.graph.bindKey('ctrl+c', this.copy)
      this.graph.bindKey('ctrl+v', this.paste)
      this.graph.bindKey('ctrl+x', this.cut)
    },
    copy() {
      const cells = this.graph.getSelectedCells()
      if (cells.length) {
        this.graph.copy(cells)
      }
      return false
    },
    cut() {
      const cells = this.graph.getSelectedCells()
      if (cells.length) {
        this.graph.cut(cells)
      }
      return false
    },
    paste() {
      if (!this.graph.isClipboardEmpty()) {
        const cells = this.graph.paste({ offset: 32 })
        this.graph.cleanSelection()
        this.graph.select(cells)
      }
      return false
    },
    handleClick(event) {
      const name = event.currentTarget.name
      switch (name) {
        case ToolCommand.log: // 查看日志
        case ToolCommand.sync: // 部署
        case ToolCommand.save: // 保存
        case ToolCommand.preview: // 预览
          this.$emit('command', name)
          break
        case 'undo':
          this.graph.history.undo()
          this.$emit('change')
          break
        case 'redo':
          this.graph.history.redo()
          this.$emit('change')
          break
        case 'delete':
          this.graph.clearCells()
          this.$emit('change')
          break
        case 'savePNG':
          this.graph.toPNG(
            dataUri => {
              // 下载
              DataUri.downloadDataUri(dataUri, 'chartx.png')
            },
            {
              backgroundColor: 'white',
              padding: {
                top: 20,
                right: 30,
                bottom: 40,
                left: 50
              },
              quality: 1
            }
          )
          break
        case 'saveSVG':
          this.graph.toSVG(dataUri => {
            // 下载
            DataUri.downloadDataUri(DataUri.svgToDataUrl(dataUri), 'chart.svg')
          })
          break
        case 'print':
          this.graph.printPreview()
          break
        case 'copy':
          this.copy()
          this.$emit('change')
          break
        case 'cut':
          this.cut()
          this.$emit('change')
          break
        case 'paste':
          this.paste()
          this.$emit('change')
          break
        case 'toJSON':
          console.log(this.graph.toJSON())
          localStorage.setItem(
            'GRAPH_DATA_ITEM',
            JSON.stringify(this.graph.toJSON())
          )
          // graph.fromJSON({cells:[graph.toJSON().cells[0],graph.toJSON().cells[1]]})
          break
        default:
          break
      }
      this.$emit('change')
    }
  }
}
</script>

<style lang="less" scoped>
button {
  margin-right: 8px;
}
.bar {
  margin-left: 16px;
  margin-right: 16px;
}
.item-space {
  //margin-left:16px;
}
</style>
