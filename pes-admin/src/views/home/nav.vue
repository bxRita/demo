<!--
  FilePath: \src\views\home\nav.vue
  Project: page-design-demo
  CreatedAt: 2021-05-18 08:50:57
  CreatedBy: ABC (<you@you.you>)
  Copyright: (c) 2021
  Task: #1
  Write a description of the code here.
-->
<template>
  <div>
    <router-link
      :to="item.to"
      v-for="item in models"
      :key="item.icon"
      :title="item.title"
      @click="changeModel(item.type)"
    >
      <a-icon :type="item.icon" />
    </router-link>
  </div>
</template>

<script>
import { ModelType } from '@/config'
export default {
  name: 'Nav',
  inheritAttrs: false,
  components: {},
  data() {
    return {
      models: [
        {
          icon: 'dashboard',
          title: '模块管理',
          type: ModelType.ModelManager,
          to: '/modelManager'
        },
        {
          icon: 'cloud',
          title: '应用展示',
          type: ModelType.ShowApp,
          to: '/showApp'
        },
        {
          icon: 'container',
          title: '资源管理',
          type: ModelType.ResourceManager,
          to: '/resourceManager'
        },
        {
          icon: 'build',
          title: '页面组态',
          type: ModelType.BuildPage,
          to: '/buildPage'
        },
        {
          icon: 'database',
          title: '业务建模',
          type: ModelType.BusinessModel,
          to: '/buildModel'
        }
      ]
    }
  },
  created() {},
  mounted() {},
  methods: {
    changeModel(type) {
      this.$emit('change', type)
    }
  }
}
</script>

<style lang="less" scoped>
div {
  display: flex;
  flex-direction: column;
  a {
    display: block;
    width: 47px;
    text-align: center;
    list-style: none;
    font-size: 35px;
  }
  a.active {
    color: red;
  }
}
</style>
