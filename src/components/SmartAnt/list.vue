<template>
  <div>
    <div class="filter-container">
      <slot :v-bind="listQuery" name="filter" />
      <el-button v-waves v-if="allowSearch" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">{{ $t('table.search') }}</el-button>
      <el-button v-if="allowAdd" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">{{ $t('table.add') }}</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">

      <el-table-column v-for="(item, key) in columns" :key="key" v-bind="item">
        <template slot-scope="scope">
          <column :value="{ key: scope.row[key] }" :item="item" :model="scope.row" :show-path="showPath" @clickLinkHandler="handleUpdate(scope.row)" />
        </template>
      </el-table-column>

      <slot />

      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="allowEdit" type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button v-if="allowDelete" type="danger" size="mini" @click="handleDelete(scope.row)">{{ deleteButtonText || $t('table.delete') }}</el-button>
          <slot name="extra-buttons" />
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog :title="textMap[formStatus]" :visible.sync="formVisible">
      <el-form ref="dataForm" :rules="finalRules" :model="model" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <inputs :schema="formElements" v-model="model" />
        <slot name="form" />
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="formStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
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
import waves from '@/directive/waves' // 水波纹指令
import Inputs from './inputs'
import Column from './columns'
import { powerT } from './helpers/powerT'

import { buildModel, buildRules, buildColumns, buildFormElements } from './helpers/builder'
import Pagination from '@/components/Pagination'

export default {
  name: 'SmartList',
  components: { Inputs, Column, Pagination },
  filters: { },
  directives: {
    waves
  },
  props: {
    model: {
      type: Object,
      default: () => {}
    },
    modelName: {
      type: String,
      default: ''
    },
    allowAdd: {
      type: Boolean,
      default: false
    },
    allowEdit: {
      type: Boolean,
      default: false
    },
    allowDelete: {
      type: Boolean,
      default: false
    },
    allowSearch: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Object,
      default: () => {}
    },
    listAction: {
      type: Function,
      default: () => new Promise()
    },
    createAction: {
      type: Function,
      default: () => new Promise()
    },
    updateAction: {
      type: Function,
      default: () => new Promise()
    },
    deleteAction: {
      type: Function,
      default: () => new Promise()
    },
    deleteButtonText: {
      type: String,
      default: null
    },
    showPath: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      formStatus: '',
      formVisible: false,
      confirmVisible: false,
      textMap: {
        update: '编辑',
        create: '新增'
      },
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined
      }
    }
  },
  computed: {
    schema: function() {
      return this.$store.getters.schemas[this.name]
    },
    columns: function() {
      return buildColumns(this.schema, this.powerT)
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
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.listAction(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1000)
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      console.log(this.listQuery)
      this.getList()
    },
    handleCreate() {
      if (Object.keys(this.schema).length > 0) {
        this.$emit('setModel', buildModel(this.schema))
      } else {
        this.$emit('resetModel')
      }

      this.formVisible = true
      this.formStatus = 'create'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.createAction(this.model).then((ret) => {
            this.list.unshift(ret.data)
            this.formVisible = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      const data = Object.assign({}, row)

      this.formStatus = 'update'
      this.formVisible = true
      this.$emit('setModel', data)

      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const data = Object.assign({}, this.model)
          this.updateAction(data).then((ret) => {
            for (const v of this.list) {
              if (v.id === this.model.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, ret.data)
                break
              }
            }
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
      const data = Object.assign({}, row)
      this.confirmVisible = true
      this.$emit('setModel', data)
    },
    deleteData() {
      const id = this.model.id

      this.deleteAction(id).then(() => {
        for (const v of this.list) {
          if (v.id === id) {
            const index = this.list.indexOf(v)
            this.list.splice(index, 1)
            break
          }
        }
        this.confirmVisible = false
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
