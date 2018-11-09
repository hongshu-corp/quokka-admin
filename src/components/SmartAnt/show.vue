<template>
  <div>
    <div class="card-wrapper">
      <el-card shadow="always">
        <div slot="header" class="clearfix">
          <b>{{ $t(`models.${name}`) }}{{ $t('actions.detail') }}</b>

          <div style="float: right; padding: 3px 0">
            <el-button v-if="allowEdit" type="primary" size="mini" @click="handleUpdate(model)">{{ $t('table.edit') }}</el-button>
            <el-button v-if="allowDelete" type="danger" size="mini" @click="handleDelete(model)">{{ $t('table.delete') }}</el-button>
            <slot name="extra-buttons" />
          </div>
        </div>
        <model-detail :schema="detailElements" :table="name" v-model="model" />
      </el-card>
    </div>

    <slot />

    <el-dialog :title="textMap[formStatus]" :visible.sync="formVisible">
      <el-form ref="dataForm" :rules="finalRules" :model="model" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <inputs :schema="formElements" v-model="model" />
        <slot name="form" />
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="confirmVisible"
      title="提示"
      width="30%">
      <span>确定要删除这条记录吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteData">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ModelDetail from './details'
import Inputs from './inputs'
import { powerT } from './helpers/powerT'

import { buildDetailElements, buildRules, buildFormElements } from './helpers/builder'

export default {
  name: 'SmartShow',
  components: { ModelDetail, Inputs },
  props: {
    modelName: {
      type: String,
      default: ''
    },
    allowEdit: {
      type: Boolean,
      default: false
    },
    allowDelete: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Object,
      default: () => {}
    },
    updateAction: {
      type: Function,
      default: () => new Promise()
    },
    deleteAction: {
      type: Function,
      default: () => new Promise()
    },
    detailAction: {
      type: Function,
      default: () => new Promise()
    },
    indexPath: {
      type: String,
      default: '/dashboard'
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      model: {},
      formStatus: 'edit',
      formVisible: false,
      confirmVisible: false,
      textMap: {
        update: '编辑',
        create: '新增'
      }
    }
  },
  computed: {
    schema: function() {
      return this.$store.getters.schemas[this.name]
    },
    detailElements: function() {
      return buildDetailElements(this.schema, this.powerT)
    },
    formElements: function() {
      return buildFormElements(this.schema, this.powerT)
    },
    finalRules: function() {
      return this.$_.merge(buildRules(this.schema), this.rules)
    },
    finalModelName: function() {
      return this.modelName.length > 0 ? this.modelName : this.schema.name
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.fetchData(id)
    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      this.detailAction(id).then(response => {
        this.model = response.data

        this.setTagTitle()
      })
    },
    setTagTitle() {
      const title = this.$t(`models.${this.name}`) + this.$t('actions.detail')
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.model.id}` })

      this.$store.dispatch('updateVisitedView', route)
    },
    handleUpdate(row) {
      this.formStatus = 'update'
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const data = Object.assign({}, this.model)
          this.updateAction(data).then((ret) => {
            this.formVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      this.confirmVisible = true
    },
    deleteData() {
      const id = this.model.id

      this.deleteAction(id).then(() => {
        this.confirmVisible = false

        this.$router.push({ path: this.indexPath })

        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      })
    },
    powerT
  }
}
</script>

<style rel="stylesheets/scss" lang="scss">

.card-wrapper {
  padding:16px 16px 0;
}

.detail-item {
  height: 25px;
}

.detail-title {
  width: 150px;
  display: inline-block;
  font-weight: bold;
  text-align: left;
}

</style>
