<!--
  FilePath: \src\views\design\preview-schema\preview-schema.vue
  Project: vue-x6-demo
  CreatedAt: 2021-05-27 11:21:50
  CreatedBy: ABC (<you@you.you>)
  Copyright: (c) 2021
  Task: #1
  Write a description of the code here.
-->
<template>
  <a-modal :title="title" :visible="visible" @cancel="handleCancel" width="80%">
    <template slot="footer">
      <a-button @click="handleCancel">Close</a-button>
    </template>
    <code-editor
      ref="dynamicCodeEditorRef"
      :codeContent="codeContent"
      :language="language"
      :readOnly="true"
    />
  </a-modal>
</template>

<script>
import CodeEditor from '@/components/code-editor/code-editor.vue'
export default {
  name: 'preview-schema',
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: 'Schema'
    },
    codeContent: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: 'graphql'
    }
  },
  components: {
    CodeEditor
  },
  data() {
    return {
      visible: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleCancel() {
      this.visible = false
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="less" scoped>
::v-deep .ant-modal-body {
  .code-editor {
    .monaco-editor {
      min-height: 450px;
    }
  }
}
</style>
