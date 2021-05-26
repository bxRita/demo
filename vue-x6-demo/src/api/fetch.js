/*
 * FilePath: \src\api\fetch.js
 * Project: page-design-demo
 * CreatedAt: 2021-05-26 11:08:44
 * CreatedBy: ABC (<you@you.you>)
 * Copyright: (c) 2021
 * Task: #1
 * Write a description of the code here.
 */

/* eslint-disable no-console */
import axios from 'axios'
import { services } from '@/settings'

const service = axios.create({
  baseURL: services.rest,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'x-requested-with': 'XMLHttpRequest'
  }
})

/**
 * request前拦截处理
 */
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    // FIXME:发起请求前显示进度条
    // Spin.show()
    // console.info('REQUEST URL:', config.baseURL + config.url)
    // 加入headers
    // 加入Content-Type
    // config.headers['Content-Type'] = 'application/json'

    return config
  },
  error => {
    console.error('request Error:')
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data)
      console.error(error.response.status)
      console.error(error.response.headers)
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error', error.message)
    }
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    // Do something with response data
    // FIXME:完成后隐藏进度条
    return response
  },
  error => {
    console.error('response Error:')
    // Do something with response error
    // FIXME:出错后隐藏进度条
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(
        'axios:The request was made and the server responded with a status code，that falls out of the range of 2xx'
      )
      console.log(error.response.data)
      console.log(error.response.status)
      console.log(error.response.headers)
      // 服务器端返回未授权时，刷新跳转到登录页面。
      if (error.response.status === 401) {
        location.reload(true)
        return
      }
      return Promise.reject(error.response)
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      console.error('axios:The request was made but no response was received')
      console.log(error.request)
      return Promise.reject(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error(
        'axios:Something happened in setting up the request that triggered an Error'
      )
      console.error(error)
      return Promise.reject(error)
    }
    // console.error(error)
  }
)

export default service
