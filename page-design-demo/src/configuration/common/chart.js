/*
 * FilePath: \src\configuration\common\chart.js
 * Project: page-design-demo
 * CreatedAt: 2021-04-15 15:45:07
 * CreatedBy: ABC (<you@you.you>)
 * Copyright: (c) 2021
 * Task: #1
 * Write a description of the code here.
 */
// 图表标题通用配置
export const chartTitle = {
  show: true,
  text: 'chart图',
  link: '',
  target: 'blank',
  textStyle: {
    color: '#333',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: 'sans-serif',
    fontSize: 18,
    textBorderColor: 'transparent',
    textBorderWidth: 0,
    textShadowColor: 'transparent',
    textShadowBlur: 0,
    textShadowOffsetX: 0,
    textShadowOffsetY: 0
  },
  subtext: '',
  sublink: '',
  subtarget: 'blank',
  subtextStyle: {
    color: '#aaa',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: 'sans-serif',
    fontSize: 12,
    align: 'left',
    verticalAlign: 'auto',
    textBorderColor: 'transparent',
    textBorderWidth: 0,
    textShadowColor: 'transparent',
    textShadowBlur: 0,
    textShadowOffsetX: 0,
    textShadowOffsetY: 0
  },
  textAlign: 'auto',
  textVerticalAlign: 'auto',
  padding: [5, 5, 5, 5],
  itemGap: 10,
  // left: 'auto',
  // top: 'auto',
  // right: 'auto',
  // bottom: 'auto',
  backgroundColor: 'transparent',
  borderColor: '#ccc',
  borderWidth: 0,
  borderRadius: [5, 5, 5, 5],
  shadowBlur: 10,
  shadowColor: '#fff',
  shadowOffsetX: 0,
  shadowOffsetY: 0
}
// 图表图例通用配置
export const chartLegend = {
  show: true,
  type: 'plain',
  left: 'right',
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  // width: 'auto',
  // height: 'auto',
  orient: 'horizontal',
  align: 'auto',
  padding: [5, 5, 5, 5],
  itemGap: 10,
  itemWidth: 25,
  itemHeight: 14,
  selectedMode: true,
  inactiveColor: '#ccc',
  textStyle: {
    color: '#333',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: 'sans-serif',
    fontSize: 12,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: [0, 0, 0, 0],
    padding: [5, 5, 5, 5],
    shadowColor: 'transparent',
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    textBorderColor: 'transparent',
    textBorderWidth: 0,
    textShadowColor: 'transparent',
    textShadowBlur: 0,
    textShadowOffsetX: 0,
    textShadowOffsetY: 0
  },
  icon: '',
  // data: [],
  backgroundColor: 'transparent',
  borderColor: '#ccc',
  borderWidth: 0,
  borderRadius: [0, 0, 0, 0],
  shadowBlur: 10,
  shadowColor: '#fff',
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  pageButtonItemGap: 5,
  pageButtonGap: 5,
  pageButtonPosition: 'end',
  pageIconColor: '#2f4554',
  pageIconInactiveColor: '#aaa',
  pageIconSize: 15,
  pageTextStyle: {
    color: '#333',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: 'sans-serif',
    fontSize: 12,
    textBorderColor: 'transparent',
    textBorderWidth: 0,
    textShadowColor: 'transparent',
    textShadowBlur: 0,
    textShadowOffsetX: 0,
    textShadowOffsetY: 0
  },
  animation: true,
  animationDurationUpdate: 800,
  selectorLabel: {
    show: true,
    distance: 5,
    // rotate: 0,
    // offset: [0,0],
    color: '#fff',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: 'sans-serif',
    fontSize: 12,
    align: 'auto',
    verticalAlign: 'auto',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    shadowColor: 'transparent',
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    textBorderColor: 'transparent',
    textBorderWidth: 0,
    textShadowColor: 'transparent',
    textShadowBlur: 0,
    textShadowOffsetX: 0,
    textShadowOffsetY: 0
  },
  selectorPosition: 'auto',
  selectorItemGap: 7,
  selectorButtonGap: 10
}
// 图表直角网格通用配置
export const chartGrid = {
  show: false,
  left: '10%',
  top: '10%',
  right: '10%',
  bottom: '10%',
  containLabel: false,
  backgroundColor: 'transparent',
  borderColor: '#ccc',
  borderWidth: 1,
  shadowBlur: 0,
  shadowColor: 'transparent',
  shadowOffsetX: 0,
  shadowOffsetY: 0
}
// 图表x轴通用配置
export const chartxAxis = {
  show: true,
  type: 'category',
  position: 'bottom',
  offset: 0,
  name: '',
  nameLocation: 'end',
  nameTextStyle: {
    color: '#333',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: 'sans-serif',
    fontSize: 12,
    align: 'auto',
    verticalAlign: 'auto',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    shadowColor: 'transparent',
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    textBorderColor: 'transparent',
    textBorderWidth: 0,
    textShadowColor: 'transparent',
    textShadowBlur: 0,
    textShadowOffsetX: 0,
    textShadowOffsetY: 0
  },
  nameGap: 15,
  nameRotate: 0,
  inverse: false,
  splitNumber: 5,
  axisLine: {
    show: true,
    lineStyle: {
      color: '#333',
      width: 1,
      type: 'solid',
      shadowBlur: 0,
      shadowColor: 'transparent',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      opacity: 1
    }
  },
  axisTick: {
    show: true,
    inside: false,
    length: 5,
    lineStyle: {
      color: '#333',
      width: 1,
      type: 'solid',
      shadowBlur: 0,
      shadowColor: 'transparent',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      opacity: 1
    }
  },
  minorTick: {
    show: false,
    splitNumber: 5,
    length: 3,
    lineStyle: {
      color: '#333',
      width: 1,
      type: 'solid',
      shadowBlur: 0,
      shadowColor: 'transparent',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      opacity: 1
    }
  },
  axisLabel: {
    show: true,
    inside: false,
    margin: 8,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: 'sans-serif',
    fontSize: 12,
    align: 'auto',
    verticalAlign: 'auto',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    shadowColor: 'transparent',
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    textBorderColor: 'transparent',
    textBorderWidth: 0,
    textShadowColor: 'transparent',
    textShadowBlur: 0,
    textShadowOffsetX: 0,
    textShadowOffsetY: 0
  },
  splitLine: {
    show: false,
    lineStyle: {
      color: '#333',
      width: 1,
      type: 'solid',
      shadowBlur: 0,
      shadowColor: 'transparent',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      opacity: 1
    }
  },
  minorSplitLine: {
    show: false
  },
  splitArea: {
    show: false
  },
  // axisPointer: {
  //   show: false,
  //   type: 'line',
  //   label: {
  //     show: false,
  //     margin: 3,
  //     color: '#fff',
  //     fontStyle: 'normal',
  //     fontWeight: 'normal',
  //     fontFamily: 'sans-serif',
  //     fontSize: 12,
  //     textBorderColor: 'transparent',
  //     textBorderWidth: 0,
  //     textShadowColor: 'transparent',
  //     textShadowBlur: 0,
  //     textShadowOffsetX: 0,
  //     textShadowOffsetY: 0,
  //     backgroundColor: 'transparent',
  //     borderColor: 'transparent',
  //     borderWidth: 1,
  //     borderRadius: [0,0,0,0],
  //     padding: [0,0,0,0],
  //     shadowColor: 'transparent',
  //     shadowBlur: 0,
  //     shadowOffsetX: 0,
  //     shadowOffsetY: 0,
  //   },
  //   lineStyle: {
  //     color: '#555',
  //     width: 1,
  //     type: 'solid',
  //     shadowBlur: 0,
  //     shadowColor: 'transparent',
  //     shadowOffsetX: 0,
  //     shadowOffsetY: 0,
  //     opacity: 0,
  //   },
  //   shadowStyle: {
  //     color: 'rgba(150,150,150,0.3)',
  //     shadowBlur: 0,
  //     shadowColor: 'transparent',
  //     shadowOffsetX: 0,
  //     shadowOffsetY: 0,
  //     opacity: 0,
  //   }
  // },
  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
}
// 图表y轴通用配置
export const chartyAxis = {
  show: true,
  type: 'value',
  position: 'left',
  offset: 0,
  name: '',
  nameLocation: 'end',
  nameTextStyle: {
    color: '#333',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: 'sans-serif',
    fontSize: 12,
    align: 'auto',
    verticalAlign: 'auto',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    shadowColor: 'transparent',
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    textBorderColor: 'transparent',
    textBorderWidth: 0,
    textShadowColor: 'transparent',
    textShadowBlur: 0,
    textShadowOffsetX: 0,
    textShadowOffsetY: 0
  },
  nameGap: 15,
  nameRotate: 0,
  inverse: false,
  boundaryGap: true,
  splitNumber: 5,
  axisLine: {
    show: true,
    lineStyle: {
      color: '#333',
      width: 1,
      type: 'solid',
      shadowBlur: 0,
      shadowColor: 'transparent',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      opacity: 1
    }
  },
  axisTick: {
    show: true,
    inside: false,
    length: 5,
    lineStyle: {
      color: '#333',
      width: 1,
      type: 'solid',
      shadowBlur: 0,
      shadowColor: 'transparent',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      opacity: 1
    }
  },
  minorTick: {
    show: false,
    splitNumber: 5,
    length: 3,
    lineStyle: {
      color: '#333',
      width: 1,
      type: 'solid',
      shadowBlur: 0,
      shadowColor: 'transparent',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      opacity: 1
    }
  },
  axisLabel: {
    show: true,
    inside: false,
    margin: 30,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: 'sans-serif',
    fontSize: 12,
    align: 'auto',
    verticalAlign: 'auto',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    shadowColor: 'transparent',
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    textBorderColor: 'transparent',
    textBorderWidth: 0,
    textShadowColor: 'transparent',
    textShadowBlur: 0,
    textShadowOffsetX: 0,
    textShadowOffsetY: 0
  },
  splitLine: {
    show: true,
    lineStyle: {
      color: '#ccc',
      width: 1,
      type: 'solid',
      shadowBlur: 0,
      shadowColor: 'transparent',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      opacity: 1
    }
  },
  minorSplitLine: {
    show: false,
    color: '#eee',
    width: 1,
    type: 'solid',
    shadowBlur: 0,
    shadowColor: 'transparent',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    opacity: 1
  },
  splitArea: {
    show: false
  }
  // axisPointer: {
  //   show: false,
  //   type: 'line',
  //   label: {
  //     show: false,
  //     margin: 3,
  //     color: '#fff',
  //     fontStyle: 'normal',
  //     fontWeight: 'normal',
  //     fontFamily: 'sans-serif',
  //     fontSize: 12,
  //     textBorderColor: 'transparent',
  //     textBorderWidth: 0,
  //     textShadowColor: 'transparent',
  //     textShadowBlur: 0,
  //     textShadowOffsetX: 0,
  //     textShadowOffsetY: 0,
  //     backgroundColor: 'transparent',
  //     borderColor: 'transparent',
  //     borderWidth: 1,
  //     borderRadius: [0,0,0,0],
  //     padding: [0,0,0,0],
  //     shadowColor: 'transparent',
  //     shadowBlur: 0,
  //     shadowOffsetX: 0,
  //     shadowOffsetY: 0,
  //   },
  //   lineStyle: {
  //     color: '#555',
  //     width: 1,
  //     type: 'solid',
  //     shadowBlur: 0,
  //     shadowColor: 'transparent',
  //     shadowOffsetX: 0,
  //     shadowOffsetY: 0,
  //     opacity: 1,
  //   },
  //   shadowStyle: {
  //     color: 'rgba(150,150,150,0.3)',
  //     shadowBlur: 0,
  //     shadowColor: 'transparent',
  //     shadowOffsetX: 0,
  //     shadowOffsetY: 0,
  //     opacity: 1,
  //   }
  // },
}
// 图表tooltip通用配置
export const chartTooltip = {
  show: true,
  trigger: 'item',
  showContent: true,
  triggerOn: 'mousemove',
  backgroundColor: 'rgba(50,50,50,0.7)',
  borderColor: '#333',
  borderWidth: 0,
  padding: [5, 5, 5, 5],
  textStyle: {
    color: '#fff',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: 'sans-serif',
    fontSize: 14,
    textBorderColor: 'transparent',
    textBorderWidth: 0,
    textShadowColor: 'transparent',
    textShadowBlur: 0,
    textShadowOffsetX: 0,
    textShadowOffsetY: 0
  },
  axisPointer: {
    type: 'line',
    label: {
      show: false,
      margin: 3,
      color: '#333',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontFamily: 'sans-serif',
      fontSize: 12,
      textBorderColor: 'transparent',
      textBorderWidth: 0,
      textShadowColor: 'transparent',
      textShadowBlur: 0,
      textShadowOffsetX: 0,
      textShadowOffsetY: 0,
      padding: [5, 7, 5, 7],
      backgroundColor: 'transparent',
      borderColor: 'transparent',
      borderWidth: 0,
      shadowBlur: 3,
      shadowColor: '#aaa',
      shadowOffsetX: 0,
      shadowOffsetY: 0
    },
    lineStyle: {
      color: '#555',
      width: 1,
      type: 'solid',
      shadowBlur: 3,
      shadowColor: '#aaa',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      opacity: 1
    },
    shadowStyle: {
      color: '#555',
      width: 1,
      type: 'solid',
      shadowBlur: 3,
      shadowColor: '#aaa',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      opacity: 1
    },
    crossStyle: {
      color: '#555',
      width: 1,
      type: 'solid',
      shadowBlur: 3,
      shadowColor: '#aaa',
      shadowOffsetX: 0,
      shadowOffsetY: 0,
      opacity: 1
    },
    animation: true
  }
}

export default {
  chartTitle,
  chartLegend,
  chartGrid,
  chartxAxis,
  chartyAxis,
  chartTooltip
}
