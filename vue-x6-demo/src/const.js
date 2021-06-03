/*
 * FilePath: \src\const.js
 * Project: vue-x6-demo
 * CreatedAt: 2021-06-02 10:42:07
 * CreatedBy: ABC (<you@you.you>)
 * Copyright: (c) 2021
 * Task: #1
 * Write a description of the code here.
 */
/**
 * 默认区域语言
 */
const BASE_URL = process.env.BASE_URL || '/'
/**
 * 默认区域语言
 */
const VUE_APP_I18N_LOCALE = process.env.VUE_APP_I18N_LOCALE || 'zh-CN'
/**
 * Fallback localization
 */
const VUE_APP_I18N_FALLBACK_LOCALE =
  process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'zh-CN'

module.exports = {
  BASE_URL: BASE_URL,
  VUE_APP_I18N_LOCALE: VUE_APP_I18N_LOCALE,
  VUE_APP_I18N_FALLBACK_LOCALE: VUE_APP_I18N_FALLBACK_LOCALE
}
