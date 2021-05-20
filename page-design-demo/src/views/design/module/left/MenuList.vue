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
  <a-menu
    :default-selected-keys="defaultSelectedKeys"
    :open-keys.sync="openKeys"
    mode="inline"
    @click="handleClick"
  >
    <template v-for="node in menus">
      <a-sub-menu
        :key="node.id"
        @titleClick="titleClick"
        v-if="node.menus && node.menus.length"
      >
        <span slot="title"
          ><span>{{ node.name }}</span></span
        >
        <menu-list :menus="node.menus"></menu-list>
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
    },
    defaultSelectedKeys: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      current: ['mail'],
      openKeys: ['sub1']
    }
  },
  created() {},
  watch: {
    openKeys(val) {
      console.log('openKeys', val)
    }
  },
  mounted() {},
  methods: {
    handleClick(e) {
      console.log('click', e)
    },
    titleClick(e) {
      console.log('titleClick', e)
    }
  }
}
</script>
