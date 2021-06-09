/*
 * FilePath: \src\utils\index.js
 * Project: vue-x6-demo
 * CreatedAt: 2021-04-01 11:09:31
 * CreatedBy: ABC (<you@you.you>)
 * Copyright: (c) 2021
 * Task: #1
 * Write a description of the code here.
 */
export { default as CellController } from './cell-controller'
export { default as EventController } from './event-controller'
export { default as X6Stencil } from './stencil'

/**
 *
 * @returns 返回16位的UUID
 */
export const uuid = () => {
  return 'xxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * @description 获取URL上参数值
 * @param {String} variable 变量名
 * @returns
 */
export function getQueryVariable(variable) {
  let query = window.location.search.substring(1)
  let vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split('=')
    if (pair[0] == variable) {
      return pair[1]
    }
  }
  return false
}
