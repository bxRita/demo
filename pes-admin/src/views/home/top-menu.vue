<!--
  FilePath: \src\views\home\top-menu.vue
  Project: page-design-demo
  CreatedAt: 2021-05-18 09:21:48
  CreatedBy: ABC (<you@you.you>)
  Copyright: (c) 2021
  Task: #1
  Write a description of the code here.
-->
<template>
  <div>
    <a v-for="(item, idx) in datas" :key="idx">{{ item.title }}</a>
  </div>
</template>

<script>
export default {
  name: 'TopMenu',
  inheritAttrs: false,
  props: {
    datas: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped>
div {
  display: flex;
  a {
    display: block;
    color: white;
    margin-right: 20px;
  }
}
</style>
