<!--
  FilePath: \src\views\design\module\right\Main.vue
  Project: page-design-demo
  CreatedAt: 2021-05-20 14:40:11
  CreatedBy: ABC (<you@you.you>)
  Copyright: (c) 2021
  Task: #1
  Write a description of the code here.
-->
<template>
  <a-tabs default-active-key="1">
    <a-tab-pane key="1" tab="组件" class="main-widget-list">
      <widget-list v-bind="$attrs"></widget-list>
    </a-tab-pane>
    <a-tab-pane key="2" tab="属性" force-render>
      <widget-props v-bind="$attrs"></widget-props>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import WidgetList from './WidgetList.vue'
import WidgetProps from './WidgetProps.vue'
export default {
  name: 'RightMain',
  inheritAttrs: false,
  components: { WidgetList, WidgetProps },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped></style>
