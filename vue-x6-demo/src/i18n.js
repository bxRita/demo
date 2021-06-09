/*
 * FilePath: \src\i18n.js
 * Project: vue-x6-demo
 * CreatedAt: 2021-06-02 10:43:07
 * CreatedBy: ABC (<you@you.you>)
 * Copyright: (c) 2021
 * Task: #1
 * Write a description of the code here.
 */

import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Moment from 'moment'
import { merge } from 'lodash'
import { VUE_APP_I18N_FALLBACK_LOCALE, VUE_APP_I18N_LOCALE } from '@/const'

Vue.use(VueI18n)

/**
 * 加载./locales目录下所有文件
 */
const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)

/**
 * 加载支持的语言
 *
 * @returns
 */
function loadSupportLanguages() {
  const languages = []
  locales.keys().forEach(key => {
    const matched = key.match(/[a-z]+-[a-z]+/i)
    if (matched && matched.length > 0) {
      const locale = matched[0]
      languages.push(locale)
    }
  })
  return languages
}

/**
 * 系统支持的语言
 */
const supportLanguages = loadSupportLanguages()

/** 浏览器设置的语言 */
const navigatorLocale = supportLanguages.includes(navigator.language)
  ? navigator.language
  : false

/**
 * 加载语言文件
 */
function loadLocaleMessages() {
  // 加载./locales目录下所有文件
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/[a-z]{2}-[a-z]{2}/i)
    if (matched && matched.length > 0) {
      const locale = matched[0]
      // 加载antd的国际化信息
      let commonLang = require('ant-design-vue/es/locale-provider/' +
        locale.replace('-', '_')).default
      // 将antd的国际化定义合并进来，可在系统中覆盖antd中的国际化信息
      messages[locale] = merge(commonLang, locales(key))
    }
  })
  return messages
}
/**
 * 语言,优先级:本地缓存>浏览器语言>默认语言>中文简体
 */
const locale =
  window.localStorage.language ||
  navigatorLocale ||
  VUE_APP_I18N_LOCALE ||
  'zh-CN'

/**
 * i18n对象
 */
const i18n = new VueI18n({
  /**
   * 语言,优先级:本地缓存>浏览器语言>默认语言>中文简体
   */
  locale,
  /**
   * fallback localization,
   * 当选择的语言对应的键值无效时,使用此设置的语言对应键值代替,详情参见http://kazupon.github.io/vue-i18n/guide/fallback.html
   */
  fallbackLocale: VUE_APP_I18N_FALLBACK_LOCALE,
  messages: loadLocaleMessages()
})

/**
 * 切换语言
 * @param {String} locale 区域,如`zh-CN`,`en-US`
 */
function changeLocale(locale) {
  if (locale && supportLanguages.includes(locale)) {
    // 修改i18n区域
    i18n.locale = locale
    // 修改moment.js的区域
    Moment.locale(locale)
  }
}

changeLocale(locale)

export { i18n, changeLocale, supportLanguages }
