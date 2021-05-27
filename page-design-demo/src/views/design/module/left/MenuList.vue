<!--
  FilePath: \src\views\design\module\left\MenuList.vue
  Project: page-design-demo
  CreatedAt: 2021-05-20 15:44:34
  CreatedBy: ABC (<you@you.you>)
  Copyright: (c) 2021
  Task: #1
  Write a description of the code here.
-->
<template>
  <a-menu mode="inline" @click="handleClick">
    <template v-for="node in menus">
      <a-sub-menu
        :key="node.id"
        v-if="node.children && node.children.length"
        @titleClick="titleClick"
      >
        <span slot="title"
          ><span>{{ node.name }}</span></span
        >
        <menu-list
          :menus="node.children"
          @menuSelected="handleClick"
        ></menu-list>
      </a-sub-menu>

      <a-menu-item :key="node.id" v-else>
        <span>{{ node.name }}</span>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script>
export default {
  name: 'menu-list',
  inheritAttrs: false,
  components: {},
  props: {
    menus: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      current: ['mail']
    }
  },
  created() {},
  watch: {},
  mounted() {},
  methods: {
    handleClick(arg) {
      console.log(arg)
      this.$emit('menuSelected', arg)
    },
    titleClick(e) {
      console.log(e)
    }
  }
}
</script>
