<template>
  <a-tabs defaultActiveKey="1">
    <a-tab-pane tab="配置实体类" key="1">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="名称" prop="name">
          <a-input v-model="form.name" @change="changeName()" />
        </a-form-model-item>
        <a-form-model-item label="类型" prop="type">
          <a-select
            v-model="form.type"
            style="width: 100%"
            @change="handleChangeType"
          >
            <a-select-option
              :value="t.value"
              v-for="t in types"
              :key="t.value"
              >{{ t.text }}</a-select-option
            >
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="属性">
          <a-button @click="showFiledManager" type="primary">属性管理</a-button>
        </a-form-model-item>
      </a-form-model>
      <FieldManager
        v-bind="fieldOp"
        v-if="fieldOp.show"
        @ok="fieldManagerOk"
        @cancel="fieldManagerCancel"
      ></FieldManager>
    </a-tab-pane>
  </a-tabs>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { Shape } from '@antv/x6'
import FieldManager from './FieldManager'
import { cloneDeep } from 'lodash'
import { getCurrentGraph } from '@/utils/graphUtil'
import { DICTIONARY_TYPE, X6CellType, ComponentType } from '@/config'
import { getSysDictField } from '@/api/er-model'
import { getEdgeCommonCfg } from '@/components/nodes'
export default {
  name: 'ConfigClass',
  components: {
    FieldManager
  },
  props: {
    id: String,
    cellData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    updateCellCallBack: {
      type: Function
    }
  },
  data() {
    let validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('名称不能为空'))
      } else {
        // TODO:
        this.validNameExist(value, callback)
      }
    }

    return {
      types: [
        {
          value: ComponentType.C,
          text: '类'
        },
        {
          value: ComponentType.I,
          text: '接口'
        }
      ],
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      other: '',
      form: {
        name: '',
        type: ComponentType.C
      },
      rules: {
        name: [{ validator: validateName, trigger: 'change' }]
      },
      graph: getCurrentGraph(),
      scaleTypes: [],
      fieldOp: {
        basisTypes: [],
        primaryTypes: [],
        foreignTypes: [],
        show: false,
        fields: []
      }
    }
  },
  computed: {
    ...mapGetters('erModel', ['fieldTypes', 'serverCells'])
  },
  async mounted() {
    this.init(this.cellData)
  },
  watch: {
    id() {
      this.init(this.cellData)
    }
  },
  methods: {
    ...mapActions('erModel', []),
    /**
     * @description 校验名称是否存在
     */
    validNameExist(value, callback) {
      let datas = this?.serverCells || []
      let isExist = datas.find(
        item =>
          item.modelName == value && item.modelPosition.id !== this.cellData.id
      )
      if (isExist) {
        callback(new Error(`${value}该名称已存在！`))
      } else {
        callback()
      }
    },
    save() {
      this.saveModel(this.cellData)
    },
    async init(cellData) {
      this.form.name = cellData.bxDatas.modelName
      this.fieldOp.fields = cellData.bxDatas.fieldsList
      this.fieldOp.fieldTypes = cloneDeep(this?.fieldTypes()) || []

      this.form.type = cellData.cellType

      this.fieldOp.basisTypes = await getSysDictField(
        DICTIONARY_TYPE.BASE_FIELD_TYPE
      )
      this.fieldOp.primaryTypes = await getSysDictField(
        DICTIONARY_TYPE.BASE_MODELPRIMARY_TYPE
      )
      this.fieldOp.foreignTypes = await getSysDictField(
        DICTIONARY_TYPE.BASE_MODELREL_TYPE
      )

      this.$refs.ruleForm.validate()
    },
    /**
     * @description 属性管理界面  点击确认 回调方法
     */
    fieldManagerOk(fields) {
      this.fieldOp.show = false
      this.handlerEdgeConnect(this.cellData.bxDatas.fieldsList, fields)
      this.cellData.bxDatas.fieldsList = fields
      this.fieldOp.fields = fields
      this.updateCell(this.cellData)
    },
    /**
     * @description 判断是否是 基本类型
     */
    checkIsBasicType(type) {
      return this.fieldOp.basisTypes.findIndex(item => item.code === type) > -1
    },
    /**
     * @description 根据属性字段对比 重新建立关联关系
     */
    handlerEdgeConnect(preFields, newFields) {
      let toDel = [],
        toAdd = [],
        toUpdate = []
      const preLen = preFields.length,
        newLen = newFields.length
      // 找出被删除的关联关系
      for (let i = 0; i < preLen; i++) {
        let temp = preFields[i],
          oldIsBasic = this.checkIsBasicType(temp.fieldType)
        let newItem = newFields.find(item => item.fieldName === temp.fieldName)
        // 删除关联关系 需要满足：
        // 旧字段中 有关联关系
        // 新字段 1：已删除   2、已更新为其它类型
        if (!oldIsBasic && (!newItem || newItem.fieldType !== temp.fieldType)) {
          toDel.push(temp)
        }
      }
      // 找出 新增的关联关系
      for (let i = 0; i < newLen; i++) {
        let temp = newFields[i],
          newIsBasic = this.checkIsBasicType(temp.fieldType)

        let oldItem = preFields.find(item => item.fieldName === temp.fieldName)
        // 新增关联关系 需要满足：
        // 新字段 类型不是基本类型 有关联关系
        // 旧列表  1. 没有这个字段  2. 有这个字段 但是 类型不一样
        if (!newIsBasic && (!oldItem || oldItem.fieldType !== temp.fieldType)) {
          toAdd.push(temp)
          continue
        }

        // 更新 关联关系 需满足
        // 字段类型不是基本类型 有关联关系 ,且关联 类型一致， 但是 外键关系不一致
        if (
          !newIsBasic &&
          oldItem.foreignRela.foreignKeyType !== temp.foreignRela.foreignKeyType
        ) {
          toUpdate.push(temp)
        }
      }
      console.log('toDel: ', toDel)
      console.log('toAdd: ', toAdd)
      console.log('toUpdate: ', toUpdate)
      // 在画布上增加连线
      const addLen = toAdd.length
      if (addLen) {
        for (let i = 0; i < addLen; i++) {
          let temp = toAdd[i],
            foreignKeyType = temp?.foreignRela?.foreignKeyType
          const forKeyDetail =
            foreignKeyType &&
            this.fieldOp.foreignTypes.find(item => item.code === foreignKeyType)

          let fieldType = temp.fieldType,
            target = this.getTargetIdByModelName(fieldType)
          if (!target) continue

          let edgeCfg = getEdgeCommonCfg(
            {
              // 线条基本信息配置
              sourceId: this.id,
              targetId: target.id,
              labelText: forKeyDetail?.name || '',
              sourcePort: this.cellData.ports.items[1].id,
              targetPort: target.ports.items[3].id
            },
            {
              // 其它配置信息

              bxDatas: {
                refTableId: this.id,
                resourceField: temp.fieldName, // 连线关联的是源表 的 哪个属性
                targetField: temp?.foreignRela?.to,
                relType: foreignKeyType
              }
            }
          )
          let edge = new Shape.Edge(edgeCfg)
          temp.extends = cloneDeep(edge.store.data)
          this.graph.addEdge(edge)
        }
      }
      // 在画布上删除连线
      const delLen = toDel.length
      if (delLen) {
        for (let i = 0; i < delLen; i++) {
          let temp = toDel[i]
          let fieldType = temp.fieldType,
            target = this.getTargetIdByModelName(fieldType)
          let curEdge = this.getEdgeBySourceAndTarget(this.id, target.id)
          curEdge && this.graph.removeEdge(curEdge.id)

          temp.extends = null
        }
      }

      // 更新画布连线
      const upLen = toUpdate.length
      if (upLen) {
        for (let j = 0; j < upLen; j++) {
          let temp = toUpdate[j]
          let keyType = temp.foreignRela.foreignKeyType
          let curCell = this.graph.getCellById(temp.extends.id)

          const forKeyDetail = this.fieldOp.foreignTypes.find(
            item => item.code === keyType
          )
          temp.extends.bxDatas.relType = keyType
          curCell.appendLabel(forKeyDetail?.name)
        }
      }
    },
    /**
     * @description 根据源节点和目标节点获取 连线信息
     */
    getEdgeBySourceAndTarget(sourceId, targetId) {
      let cellObj = this.graph.toJSON(),
        cells = cellObj.cells,
        edges = cells.filter(item => item.shape === X6CellType.edge)

      return edges.find(
        item => item.source.cell === sourceId && item.target.cell === targetId
      )
    },
    /**
     * @description 根据模型名称 获取当前模型所属组件的id
     */
    getTargetIdByModelName(modelName) {
      let cellObj = this.graph.toJSON(),
        cells = cellObj.cells
      let temp = cells.find(item => item?.bxDatas?.modelName === modelName)
      return temp || null
    },
    /**
     * @description 属性管理界面  点击取消 回调方法
     */
    fieldManagerCancel() {
      this.fieldOp.show = false
    },
    showFiledManager() {
      this.fieldOp.show = true
    },
    updateCell() {
      this.updateCellCallBack && this.updateCellCallBack(this.cellData)
    },
    handleChangeType() {
      this.cellData.cellType = this.form.type

      this.updateCell(this.cellData)
    },
    changeName() {
      this.cellData.bxDatas.modelName = this.form.name
      this.updateCell(this.cellData)
    }
  }
}
</script>

<style lang="less" scoped></style>
