/*
 * FilePath: \index.js
 * Project: vue-x6-demo
 * CreatedAt: 2021-05-18 10:09:59
 * CreatedBy: ABC (<you@you.you>)
 * Copyright: (c) 2021
 * Task: #1
 * Write a description of the code here.
 */
import BuildModel from './src/views/design/index.vue'

import erModel from './src/store/modules/design'

BuildModel.install = Vue => Vue.component(BuildModel.name, BuildModel) //注册组件

export { erModel }

export default BuildModel
