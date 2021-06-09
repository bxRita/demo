<!--
  FilePath: \src\views\filedetail\index.vue
  Project: vue-x6-demo
  CreatedAt: 2021-06-08 16:29:11
  CreatedBy: ABC (<you@you.you>)
  Copyright: (c) 2021
  Task: #1
  Write a description of the code here.
-->
<template>
  <div :style="editorStyle">
    <code-editor
      ref="dynamicCodeEditorRef"
      :codeContent="codeContent"
      :language="language"
      :readOnly="true"
    />
  </div>
</template>

<script>
import CodeEditor from '@/components/code-editor/code-editor.vue'
import { getQueryVariable } from '@/utils'
import { getFileContent } from '@/api/er-model'
export default {
  name: 'file-detail',
  inheritAttrs: false,
  components: {
    CodeEditor
  },
  data() {
    return {
      fileName: '',
      language: 'javascript',
      codeContent: '',
      editorStyle: {}
    }
  },
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    /**
     * @description 获取可视区的宽高
     */
    resizeContainer() {
      this.editorStyle = {
        width: document.body.offsetWidth,
        height: document.body.offsetHeight
      }
    },
    async init() {
      this.fileName = getQueryVariable('filename')
      if (!this.fileName) return
      const res = await getFileContent(this.fileName)
      this.language = this.fileName.substring(this.fileName.indexOf('.') + 1)
      this.codeContent = res

      window.addEventListener('resize', this.resizeContainer, false)
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeContainer)
  }
}
</script>

<style lang="less" scoped>
::v-deep .code-editor {
  .monaco-editor {
    min-height: 200px;
  }
}
</style>
