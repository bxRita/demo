<!--
  FilePath: \src\components\config-panel\ConfigClass\FieldForm.vue
  Project: vue-x6-demo
  CreatedAt: 2021-04-23 15:38:53
  CreatedBy: ABC (<you@you.you>)
  Copyright: (c) 2021
  Task: #1
  Write a description of the code here.
-->
<template>
  <a-modal
    :title="title"
    :visible="visible"
    @ok="handleOk"
    @cancel="handleCancel"
    width="45%"
  >
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item
        :label="$t('product.model.config.fieldName')"
        prop="fieldName"
      >
        <a-input v-model="form.fieldName" />
      </a-form-model-item>
      <a-form-model-item
        :label="$t('product.model.config.fieldType')"
        prop="fieldType"
      >
        <a-select
          v-model="form.fieldType"
          placeholder="请选择字段类型"
          show-search
          option-filter-prop="children"
          :filter-option="filterOption"
          allowClear
          @change="changeFieldType"
        >
          <a-select-option
            :value="item.code"
            :key="idx + item.code"
            v-for="(item, idx) in types"
          >
            {{ item.code }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item
        :label="$t('product.model.config.fieldDesc')"
        prop="fieldDes"
      >
        <a-input v-model="form.fieldDes" />
      </a-form-model-item>
      <a-form-model-item :label="$t('common.required')" prop="fieldIsNull">
        <a-switch v-model="form.fieldIsNull" />
      </a-form-model-item>
      <a-form-model-item label="默认值" prop="defaultValue">
        <a-input v-model="form.defaultValue" />
      </a-form-model-item>
      <a-form-model-item label="主键类型" prop="primaryType">
        <a-select v-model="form.primaryType" placeholder="请选择主键类型">
          <a-select-option
            :value="item.code"
            :key="item.code + idx"
            v-for="(item, idx) in primaryKeyTypes"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <template v-if="isAssociateType && !typeItem.isBasic">
        <a-form-model-item label="模型关联类型" prop="foreignKeyType">
          <a-select
            v-model="form.foreignRela.foreignKeyType"
            placeholder="请选择"
          >
            <a-select-option
              :value="item.code"
              :key="idx + item.code + item.name"
              v-for="(item, idx) in foreignTypes"
            >
              {{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="模型关联字段" prop="foreignRelaTo">
          <a-select v-model="form.foreignRela.to" placeholder="请选择">
            <a-select-option
              :value="item.fieldName"
              :key="idx + item.fieldName"
              v-for="(item, idx) in relFields"
            >
              {{ item.fieldName }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </template>
      <a-form-model-item label="指令名称" prop="directType">
        <a-select
          v-model="form.directType"
          placeholder="请选择"
          @change="changeDirect"
        >
          <a-select-option
            :value="item.directType"
            :key="item.directType + idx"
            v-for="(item, idx) in directList"
          >
            {{ item.directType }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <template v-if="directArgsList.length">
        <a-form-model-item label="指令值" prop="direct">
          <a-row>
            <a-col :span="6"><B>directArgsType</B></a-col>
            <a-col :span="6"><B>directKey</B></a-col>
            <a-col :span="6"><B>directDesc</B></a-col>
            <a-col :span="6"><B>directValue</B></a-col>
          </a-row>
          <a-row
            v-for="(directArg, idx) in directArgsList"
            :key="directArg.directDesc + idx"
          >
            <a-col :span="6">
              {{ directArg.directArgsType }}
            </a-col>
            <a-col :span="6">
              {{ directArg.directKey }}
            </a-col>
            <a-col :span="6">
              {{ directArg.directDesc }}
            </a-col>
            <a-col :span="6">
              <a-input
                v-if="!isDictionary"
                v-model="directArg.directValue"
                @change="changeDirectVal"
              />
              <a-select
                v-else
                :key="directArg.directArgsType + idx"
                v-model="directArg.directValue"
                @change="changeDirectVal"
              >
                <a-select-option
                  :value="d.directValue"
                  :key="d.directDesc + '_' + d.directValue"
                  :title="d.directDesc"
                  v-for="d in directValueList"
                >
                  {{ d.directDesc }}
                </a-select-option>
              </a-select>
            </a-col>
          </a-row>
        </a-form-model-item>
      </template>
    </a-form-model>
  </a-modal>
</template>

<script>
import { cloneDeep } from 'lodash'
import { getDirectList, getDictionaryValus } from '@/api/er-model'
import { PrimaryType } from '@/config'
const DICTIONARY = 'dictionary' // 数据字典类型
export default {
  name: 'FieldForm',
  inheritAttrs: false,
  components: {},
  props: {
    title: {
      type: String,
      default: '新增字段'
    },
    item: {
      type: Object,
      default: () => {}
    },
    fieldTypes: {
      type: Array,
      default: () => []
    },
    basisTypes: {
      type: Array,
      default: () => []
    },
    primaryKeyTypes: {
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
      directList: [],
      directArgsList: [],
      types: [],
      relFields: [],
      visible: true,
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      directValueList: [],
      form: {
        fieldName: '',
        fieldType: 'String',
        fieldDes: '',
        fieldIsNull: false,
        defaultValue: '',
        primaryType: PrimaryType.B,
        foreignRela: {
          foreignKeyType: '0',
          from: '',
          to: ''
        },
        directType: '',
        direct: ''
      },
      rules: {
        fieldName: [
          {
            required: true,
            message: '请输入字段名',
            trigger: 'blur'
          }
        ],
        fieldType: [
          {
            required: true,
            message: '请输入字段类型',
            trigger: 'blur'
          }
        ],
        direct: [
          {
            required: true,
            message: '请输入指令值',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    typeItem() {
      let fieldType = this.form.fieldType
      const typeItem = this.types.find(item => item.code === fieldType)
      return (typeItem && (typeItem.isBasic ? typeItem : typeItem.data)) || {}
    },
    isDictionary() {
      return this.form.directType === DICTIONARY
    },
    isAssociateType() {
      return this.form.primaryType === PrimaryType.R
    }
  },
  async mounted() {
    this.directValueList = await getDictionaryValus() // 数据字典所有项值
    this.directList = await getDirectList()
    this.form = Object.assign({}, this.form, this.item)
    const basisTypes = cloneDeep(this.basisTypes)
    // 标识基本类型
    basisTypes.map(item => {
      item.isBasic = true
      return item
    })

    this.types = basisTypes.concat(this.fieldTypes)

    const { direct } = this.form
    if (direct && direct.length) {
      this.form.directType = direct[0].directType

      let directItem = this.directList.find(
        item => item.directType == this.form.directType
      )

      this.directArgsList = directItem.directArgsList.map(item => {
        let editVal = direct.find(i => i.directKey === item.directKey)
        editVal && (item.directValue = editVal.directValue)
        return item
      })
    }
  },
  methods: {
    changeDirectVal(val) {
      this.form.direct = val
    },
    async changeDirect(directType) {
      let direct = this.directList.find(item => item.directType == directType)
      this.directArgsList = (direct && direct.directArgsList) || []
    },
    changeFieldType() {
      let typeItem = this.typeItem
      // 类别类型的时候 为关联表字段
      this.relFields = !typeItem.isBasic ? typeItem.fieldsList : []
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    handleOk() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.ok()
        } else {
          return false
        }
      })
    },
    ok() {
      this.visible = false
      let typeItem = this.typeItem
      typeItem.isBasic && delete this.form.foreignRela

      console.log(this.form)
      if (this.form.directType) {
        let direct = this.directList.find(
          item => item.directType == this.form.directType
        )
        let directArgsList = direct && direct.directArgsList
        const directs = directArgsList.length
          ? directArgsList.map(item => {
              item.directType = this.form.directType
              return item
            })
          : [
              {
                directType: this.form.directType
              }
            ]

        this.form.direct = directs
      }
      delete this.form.directType
      console.log('field: ', this.form)
      this.$emit('ok', this.form)
    },
    handleCancel() {
      this.visible = false
      this.$emit('cancel')
    }
  }
}
</script>
