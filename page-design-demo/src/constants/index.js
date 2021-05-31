/*
 * FilePath: \src\constants\index.js
 * Project: page-design-demo
 * CreatedAt: 2021-04-09 17:03:39
 * CreatedBy: ABC (<you@you.you>)
 * Copyright: (c) 2021
 * Task: #1
 * Write a description of the code here.
 */

// store 命名空间 模块名
export const StoreModel = {
  design: 'pageModel'
}
export const WidgetType = {
  basis: 'basis',
  layout: 'layout',
  chart: 'chart'
}

export const MenuType = {
  internal: '1',
  outside: '2'
}
// 初始化设计面板数据
export const DEFAULT_PAGE_DATA = {
  list: [], // 设计面板子元素
  config: {
    layout: 'horizontal',
    labelCol: {
      xs: 4,
      sm: 4,
      md: 4,
      lg: 4,
      xl: 4,
      xxl: 4
    },
    wrapperCol: {
      xs: 18,
      sm: 18,
      md: 18,
      lg: 18,
      xl: 18,
      xxl: 18
    },
    hideRequiredMark: false,
    customStyle: ''
  }
}

export const WidgetComponentName = {
  // 基础组件
  BUTTON: 'xaButton',
  CHECKBOX: 'xaCheckbox',
  DATATABLE: 'xaDatatable',
  DATEPICKER: 'xaDatepicker',
  DROPDOWN: 'xaDropdown',
  INPUT: 'xaInput',
  MENU: 'xaMenu',
  RADIO: 'xaRadio',
  SELECT: 'xaSelect',
  // 布局组件
  CARD: 'xaCard',
  DIALOG: 'xaDialog',
  GRID: 'xaGrid',
  TABLE: 'xaTable',
  TABS: 'xaTabs',
  LAYOUT_SIMPLE: 'xaLayoutSimple',
  // 图表组件
  ECHARTS_BAR3D: 'xaEchartsBarD',
  ECHARTS_BAR: 'xaEchartsBar',
  ECHARTS_GAUGE: 'xaEchartsGauge',
  ECHARTS_LINE3D: 'xaEchartsLineD',
  ECHARTS_LINE: 'xaEchartsLine',
  ECHARTS_MAP3D: 'xaEchartsMapD',
  ECHARTS_MAP: 'xaEchartsMap',
  ECHARTS_PIE: 'xaEchartsPie',
  ECHARTS_RADAR: 'xaEchartsRadar'
}
