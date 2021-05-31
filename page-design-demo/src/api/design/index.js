/*
 * FilePath: \src\api\design\index.js
 * Project: page-design-demo
 * CreatedAt: 2021-05-28 10:24:41
 * CreatedBy: ABC (<you@you.you>)
 * Copyright: (c) 2021
 * Task: #1
 * Write a description of the code here.
 */
import { request as fetch } from '@/api/request'

/**
 * 根据id 获取页面信息详情
 *
 * @returns {Promise}
 */
export async function getPageInfoById(id) {
  const res = await fetch({
    method: 'get',
    url: `/page/find/${id}`
  })
  return res
}
/**
 * 获取左侧菜单树列表
 *
 * @returns {Promise}
 */
export async function getLeftMenus() {
  const res = await fetch({
    method: 'get',
    url: '/page/menu/list'
  })
  return res
}

/**
 * 更新页面 设计面板区域内容
 *
 * @returns {Promise}
 */
export async function updatePageContent(reqData) {
  const res = await fetch({
    method: 'put',
    url: 'page/update',
    data: reqData
  })
  return res
}
