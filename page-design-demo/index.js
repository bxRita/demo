/*
 * FilePath: \index.js
 * Project: page-design-demo
 * CreatedAt: 2021-05-18 09:55:33
 * CreatedBy: ABC (<you@you.you>)
 * Copyright: (c) 2021
 * Task: #1
 * Write a description of the code here.
 */
import PageDesign from './src/views/design/index.vue'

PageDesign.install = Vue => Vue.component(PageDesign.name, PageDesign) //注册组件

export default PageDesign
