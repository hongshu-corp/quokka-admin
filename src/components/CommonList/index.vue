<template>
  <div>
    <div class="filter-container">
      <slot name="filter-items"/>
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

      <el-table-column v-for="(item, key) in getColumns()" :key="key" v-bind="item">
        <template slot-scope="scope">
          <span>{{ scope.row[key] }}</span>
        </template>
      </el-table-column>

      <slot />

      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="allowAdd" type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button v-if="allowDelete" type="danger" size="mini" @click="handleDelete(scope.row)">{{ $t('table.delete') }}</el-button>
          <slot name="extra-buttons" />
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10, 20, 30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="formVisible">
      <el-form ref="dataForm" :rules="rules" :model="model" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item v-for="(item, key) in getFormElements()" :key="`el-${key}`" v-bind="item">
          <text-input :value="model[key]" v-bind="item" @input="updateForm(key, $event)" />
        </el-form-item>

        <slot name="form" />
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="formVisible = false">{{ $t('table.cancel') }}</el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="confirmVisible"
      title="提示"
      width="30%">
      <span>{{ confirmText }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteData">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import TextInput from './textInput'

export default {
  name: 'CommonList',
  components: { TextInput },
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
    confirmText: {
      type: String,
      default: '确认删除吗？'
    },
    rules: {
      type: Object,
      default: () => {}
    },
    definitions: {
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
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listLoading: true,
      dialogStatus: '',
      formVisible: false,
      confirmVisible: false,
      textMap: {
        update: '编辑',
        create: '新增'
      },
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined,
        sort: '+id'
      }
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
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleCreate() {
      this.$emit('resetModel')
      this.formVisible = true
      this.dialogStatus = 'create'
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
    getColumns() {
      const filter = this.$_.pickBy(this.definitions, (x) => this.$_.has(x, 'column'))
      var ret = {}

      for (var key in filter) {
        ret[key] = filter[key]['column']
        ret[key].label = this.getLabelI18n(key)
      }

      return ret
    },
    getFormElements() {
      const filter = this.$_.pickBy(this.definitions, (x) => this.$_.has(x, 'form'))
      var ret = {}

      for (var key in filter) {
        ret[key] = filter[key].form
        ret[key].label = this.getLabelI18n(key)
        ret[key].prop = key
        ret[key].type = filter[key].form.type
      }

      return ret
    },
    getLabelI18n(key) {
      const path = `attributes.common.${key}`
      return this.$t(path) === path ? this.$t(`attributes.${this.modelName}.${key}`) : this.$t(path)
    },
    updateForm(fieldName, value) {
      this.$set(this.model, fieldName, value)
    }
  }
}
</script>
