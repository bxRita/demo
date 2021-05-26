/*
 * FilePath: \src\components\config-panel\saveMixins.js
 * Project: vue-x6-demo
 * CreatedAt: 2021-04-28 13:39:10
 * CreatedBy: ABC (<you@you.you>)
 * Copyright: (c) 2021
 * Task: #1
 * Write a description of the code here.
 */
import { createModel, updateModel } from '@/api/er-model'
import { cloneDeep } from 'lodash'
export default {
  props: {
    fileName: String
  },
  methods: {
    /**
     * @description 保存模型
     */
    async saveModel() {
      let cellData = cloneDeep(this.cellData),
        modelData = cloneDeep(cellData.bxDatas)
      delete cellData.component
      cellData.isSaved
        ? await this.updateModel(modelData, cellData)
        : await this.createModel(modelData, cellData)

      this.cellData.isSaved = true
    },
    async updateModel(modelData, cellData) {
      const bakCell = this.$store.getters['erModel/getBakCellById'](
        this.cellData.id
      )
      if (bakCell) {
        let preName = bakCell?.bxDatas?.modelName
        console.log('preName', bakCell, preName)
        let reqData = {
          data: Object.assign(modelData, {
            oldModelName: preName,
            modelType: cellData.cellType,
            extends: {
              saveData: [cellData]
            }
          }),
          filename: this.fileName,
          preview: false
        }

        await updateModel(reqData)
      }
    },
    async createModel(modelData, cellData) {
      let reqData = {
        data: Object.assign(modelData, {
          modelType: cellData.cellType,
          extends: {
            saveData: [cellData]
          }
        }),
        filename: this.fileName,
        preview: false
      }
      await createModel(reqData)
    }
  }
}
