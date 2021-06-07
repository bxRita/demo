<!--
  FilePath: \src\components\config-panel\ConfigClass\FieldManager.vue
  Project: vue-x6-demo
  CreatedAt: 2021-04-23 15:23:06
  CreatedBy: ABC (<you@you.you>)
  Copyright: (c) 2021
  Task: #1
  Write a description of the code here.
-->
<template>
  <a-modal
    title="类别字段管理"
    :visible="visible"
    width="50%"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-row>
      <a-col>
        <a-button @click="addField">新增属性</a-button>
      </a-col>
    </a-row>
    <a-row>
      <a-col>
        <a-table :columns="columns" :data-source="data" rowKey="fieldName">
          <a slot="fieldIsNull" slot-scope="text">{{ text ? '是' : '否' }}</a>
          <span slot="action" slot-scope="text, record">
            <a @click="editField(record)">Edit</a>
            <a-divider type="vertical" />
            <a-popconfirm
              title="确定删除该字段?"
              ok-text="确定"
              cancel-text="取消"
              @confirm="deleteField(record)"
            >
              <a>Delete</a>
            </a-popconfirm>
          </span>
        </a-table>
      </a-col>
    </a-row>
    <FieldForm
      v-bind="fieldFormOp"
      v-if="fieldFormOp.show"
      @ok="fieldOk"
      @cancel="fieldCancel"
    ></FieldForm>
  </a-modal>
</template>

<script>
import { cloneDeep } from 'lodash'
import FieldForm from './FieldForm.vue'
// 默认基本属性类型
const DEFAULT_BASIC = [
  {
    code: 'String',
    name: '字符串'
  },
  {
    code: 'Int',
    name: '整数'
  },
  {
    code: 'DateTime',
    name: '日期'
  },
  {
    code: 'JSON',
    name: '对象类型'
  },
  {
    code: 'Boolean',
    name: '布尔类型'
  }
]
// 默认外键类型
const MODELREL_TYPE = [
  {
    code: '0',
    name: '没有关联关系'
  },
  {
    code: '1',
    name: '1:1'
  },
  {
    code: '2',
    name: '1:N'
  },
  {
    code: '3',
    name: 'N:N'
  }
]
export default {
  name: 'FieldManager',
  inheritAttrs: false,
  components: {
    FieldForm
  },
  props: {
    fields: {
      type: Array,
      default: () => []
    },
    fieldTypes: {
      type: Array,
      default: () => []
    },
    basisTypes: {
      type: Array,
      default: () => []
    },
    primaryTypes: {
      type: Array,
      default: () => []
    },
    foreignTypes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      visible: true,
      fieldFormOp: {
        show: false,
        item: null,
        fieldTypes: [],
        primaryKeyTypes: this.primaryTypes, // 主键类型
        basisTypes: this.basisTypes.length ? this.basisTypes : DEFAULT_BASIC,
        foreignTypes: this.foreignTypes.length
          ? this.foreignTypes
          : MODELREL_TYPE
      },
      columns: [
        {
          title: this.$t('product.model.config.fieldName'),
          dataIndex: 'fieldName',
          key: 'fieldName'
        },
        {
          title: this.$t('product.model.config.fieldType'),
          dataIndex: 'fieldType',
          key: 'fieldType'
        },
        {
          title: this.$t('product.model.config.fieldDesc'),
          dataIndex: 'fieldDes',
          key: 'fieldDes'
        },
        {
          title: this.$t('common.required'),
          dataIndex: 'fieldIsNull',
          key: 'fieldIsNull',
          scopedSlots: { customRender: 'fieldIsNull' }
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      data: []
    }
  },
  mounted() {
    this.data = cloneDeep(this.fields)
    this.fieldFormOp.fieldTypes = this.fieldTypes
  },
  methods: {
    /**
     * @description 属性增加、编辑 确定回调
     */
    fieldOk(record) {
      let isAdd = !this.fieldFormOp.item
      if (isAdd) {
        this.data.push(record)
      } else {
        let idx = this.data.findIndex(
          item => item.fieldName === record.fieldName
        )
        this.data.splice(idx, 1, record)
      }
      this.fieldFormOp.show = false
    },
    /**
     * @description 属性增加、编辑 取消回调
     */
    fieldCancel() {
      this.fieldFormOp.show = false
    },
    /**
     * @description 属性增加
     */
    addField() {
      this.fieldFormOp.show = true
      this.fieldFormOp.item = null
    },
    /**
     * @description 属性编辑
     */
    editField(record) {
      this.fieldFormOp.show = true
      this.fieldFormOp.item = record
    },
    /**
     * @description 属性删除
     */
    deleteField(record) {
      let idx = this.data.findIndex(item => item.fieldName === record.fieldName)
      this.data.splice(idx, 1)
    },
    /**
     * @description 属性管理 确定
     */
    handleOk() {
      this.$emit('ok', this.data)
    },
    /**
     * @description 属性管理 取消
     */
    handleCancel() {
      this.$emit('cancel')
    }
  }
}
</script>
