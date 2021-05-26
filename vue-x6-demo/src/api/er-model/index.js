/*
 * FilePath: \src\api\er-model\index.js
 * Project: page-design-demo
 * CreatedAt: 2021-05-26 11:14:30
 * CreatedBy: ABC (<you@you.you>)
 * Copyright: (c) 2021
 * Task: #1
 * Write a description of the code here.
 */
import fetch from '@/api/fetch'

/**
 * 初始化模型数据
 *
 * @returns {Promise}
 */
export async function getAllModel(data) {
  const res = await fetch({
    url: 'initModel',
    method: 'POST',
    data
  })
  return res.data.data
}

/**
 * 删除模型
 * @param {Object} where
 * @param {Object} create
 * @param {Object} update
 */
export async function deleteModel(data) {
  const res = await fetch({
    url: 'deleteModel',
    method: 'POST',
    data
  })
  return res.data.data
}

/**
 * 新增模型
 * @param {Object} where
 * @param {Object} create
 * @param {Object} update
 */
export async function createModel(data) {
  const res = await fetch({
    url: 'createModel',
    method: 'POST',
    data
  })
  return res.data.data
}
/**
 * 更新模型
 * @param {Object} where
 * @param {Object} create
 * @param {Object} update
 */
export async function updateModel(data) {
  const res = await fetch({
    url: 'updateModel',
    method: 'POST',
    data
  })
  return res.data.data
}
/**
 * @description 获取数据字典类型
 * @param {String} type
 */
export async function getSysDictField(type) {
  const res = await fetch({
    url: 'getDictionaryType',
    method: 'POST',
    data: {
      baseType: type
    }
  })
  return res.data.data
}
/**
 * @description 获取指令列表
 * @param {String} type
 */
export async function getDirectList() {
  const res = await fetch({
    url: 'directList',
    method: 'GET'
  })
  return res.data.data
}
