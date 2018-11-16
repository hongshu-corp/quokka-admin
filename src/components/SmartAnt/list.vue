<template>
  <div>
    <smart-table
      ref="table"
      :allow-add="allowAdd"
      :allow-edit="allowAdd"
      :allow-delete="allowDelete"
      :allow-search="allowSearch"
      :allow-inner-filter="allowInnerSearch"
      :allow-select="allowSelectRows"
      :delete-button-text="deleteButtonText"
      :show-path="showPath"
      :list-action="listAction"
      :schema="schema"
      @table-add="tableAdd"
      @table-search="()=>{}"
      @inner-filter="searchVisible=true"
      @row-delete="rowDelete"
      @row-update="rowUpdate">
      <template slot="actions">
        <slot name="row-actions" />
      </template>

      <template slot="columns">
        <slot name="table-columns" />
      </template>

      <template slot="table-search">
        <slot name="form-search" />
      </template>
      <span />
    </smart-table>

    <el-dialog :title="textMap[formStatus]" :visible.sync="formVisible">
      <smart-form
        ref="form"
        v-model="model"
        :schema="schema"
        :rules="rules"
        @form-ok="formStatus==='create'?createData():updateData()"
        @form-cancel="formVisible = false" />
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

    <el-dialog :visible.sync="searchVisible" title="查找">
      <smart-table
        ref="searchTable"
        :list-action="innerSearchAction"
        :schema="schema"
        :has-actions="false"
        allow-select
        allow-search />
    </el-dialog>

    <slot name="expand" />

  </div>
</template>

<script>
import SmartForm from './form'
import SmartTable from './table'
import { buildModel } from './helpers/builder'

export default {
  name: 'SmartList',
  components: { SmartTable, SmartForm },
  filters: { },
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
    allowSelectRows: {
      type: Boolean,
      default: false
    },
    allowInnerSearch: {
      type: Boolean,
      default: false
    },
    // additional rules.
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
    // Inner popup dialog for search
    innerSearchAction: {
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
      formStatus: '',
      formVisible: false,
      confirmVisible: false,
      searchVisible: false,
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
    finalModelName: function() {
      return this.modelName.length > 0 ? this.modelName : this.schema.name
    }
  },
  methods: {
    tableAdd() {
      if (Object.keys(this.schema).length > 0) {
        this.$emit('setModel', buildModel(this.schema))
      } else {
        this.$emit('resetModel')
      }

      this.formVisible = true
      this.formStatus = 'create'
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    rowUpdate(data) {
      this.formStatus = 'update'
      this.formVisible = true
      this.$emit('setModel', data)

      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    },
    rowDelete(data) {
      this.confirmVisible = true
      this.$emit('setModel', data)
    },
    createData() {
      this.createAction(this.model).then((ret) => {
        this.formVisible = false
        this.$refs.table.append(ret.data)
      })
    },
    updateData() {
      const data = Object.assign({}, this.model)
      this.updateAction(data).then((ret) => {
        this.formVisible = false
        this.$refs.table.replace(data)
      })
    },
    deleteData() {
      const id = this.model.id

      this.deleteAction(id).then(() => {
        this.confirmVisible = false
        this.$refs.table.delete(id)
      })
    }
  }
}
</script>
