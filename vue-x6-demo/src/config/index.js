/*
 * FilePath: \src\config\index.js
 * Project: vue-x6-demo
 * CreatedAt: 2021-04-01 16:22:40
 * CreatedBy: ABC (<you@you.you>)
 * Copyright: (c) 2021
 * Task: #1
 * Write a description of the code here.
 */

export const PrimaryType = {
  B: '0', // 基础数据类型
  R: '1', // 关联关系类型
  U: '2' // 唯一主键类型
}

// 默认外键类型
export const BASE_MODELREL_TYPE = {
  NONE: {
    code: '0',
    name: '没有关联关系'
  },
  ONE2ONE: {
    code: '1',
    name: '一对一关联关系'
  },
  ONE2MUL: {
    code: '2',
    name: '一对多关联关系'
  },
  MUL2MUL: {
    code: '3',
    name: '多对多关联关系'
  }
}

// 类型默认字段
export const CLASS_DEFAULT_VAL = [
  {
    fieldType: 'ID',
    fieldName: 'id',
    fieldIsNull: false,
    defaultValue: '',
    primaryType: PrimaryType.U,
    direct: [
      {
        directType: 'id'
      }
    ]
  },
  {
    fieldType: 'DateTime',
    fieldName: 'createAt',
    fieldIsNull: false,
    defaultValue: '',
    primaryType: PrimaryType.B,
    direct: [
      {
        directType: 'createdAt'
      }
    ]
  },
  {
    fieldType: 'DateTime',
    fieldName: 'updateAt',
    fieldIsNull: false,
    defaultValue: '',
    primaryType: PrimaryType.B,
    direct: [
      {
        directType: 'updatedAt'
      }
    ]
  }
]

export const ENUM_DEFAULT_VAL = [
  { fieldName: 'Y', fieldType: 'String', primaryType: '0' },
  { fieldName: 'N', fieldType: 'String', primaryType: '0' }
]
// 工具栏命令
export const ToolCommand = {
  save: 'save',
  preview: 'preview'
}
export const ComponentType = {
  E: 'ENUM', // 枚举
  C: 'TABLE', // 类
  I: 'interface', // 接口
  S: 'Scalar' // 标量
}

// 颜色定义
export const color = {
  blue: 'rgb(95, 149, 255)',
  yellow: 'rgb(254, 133, 79)'
}

export const X6CellType = {
  edge: 'edge'
}

// 数据字段中 type分类
export const DICTIONARY_TYPE = {
  BASE_FIELD_TYPE: 'BASE_FIELD_TYPE', // 类别基本字段
  BASE_MODELPRIMARY_TYPE: 'BASE_MODELPRIMARY_TYPE', // 主键类型
  BASE_MODELREL_TYPE: 'BASE_MODELREL_TYPE' // 模型关系
}
