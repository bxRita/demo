/*
 * FilePath: \index.js
 * Project: page-design-demo
 * CreatedAt: 2021-05-18 10:09:59
 * CreatedBy: ABC (<you@you.you>)
 * Copyright: (c) 2021
 * Task: #1
 * Write a description of the code here.
 */
import BuildModel from './src/views/design/index.vue'

BuildModel.install = Vue => Vue.component(BuildModel.name, BuildModel) //注册组件

export default BuildModel
