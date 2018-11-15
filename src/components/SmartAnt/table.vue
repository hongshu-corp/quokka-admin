<template>
  <div>
    <div class="filter-container">
      <slot :v-bind="listQuery" name="filter" />
      <el-button v-waves v-if="allowSearch" class="filter-item" type="primary" icon="el-icon-search" @click="clickSearch">{{ $t('table.search') }}</el-button>
      <el-button v-waves v-if="allowAdd" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="clickAdd">{{ $t('table.add') }}</el-button>
      <el-button v-waves v-if="allowInnerFilter" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="clickInnerFilter">{{ $t('table.add') }}</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      ref="table"
      :data="list"
      border
      fit
      highlight-current-row
      stripe
      style="width: 100%;"
      @selection-change="selectionChange"
      @row-click="rowClick">

      <el-table-column v-if="allowSelect" type="selection" width="50" />

      <el-table-column v-for="(item, key) in columns" :key="key" v-bind="item">
        <template slot-scope="scope">
          <smart-column
            :value="getColumnValue(scope.row, key)"
            :item="item"
            :model="scope.row"
            :show-path="showPath"
            @pop-form="clickRowUpdate(scope.row)" />
        </template>
      </el-table-column>
      <slot name="columns" />
      <el-table-column v-if="hasActions" :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="allowEdit" type="primary" size="mini" @click="clickRowUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <el-button v-if="allowDelete" type="danger" size="mini" @click="clickRowDelete(scope.row)">{{ deleteButtonText || $t('table.delete') }}</el-button>
          <slot name="actions" />
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令
import SmartColumn from './columns'
import { powerT } from './helpers/powerT'

import { buildColumns } from './helpers/builder'
import Pagination from '@/components/Pagination'

export default {
  name: 'SmartTable',
  components: { SmartColumn, Pagination },
  directives: {
    waves
  },
  props: {
    allowAdd: {
      type: Boolean,
      default: false
    },
    allowInnerFilter: {
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
    allowSelect: {
      type: Boolean,
      default: false
    },
    hasActions: {
      type: Boolean,
      default: true
    },
    listAction: {
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
    schema: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      selected: [],
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined
      }
    }
  },
  computed: {
    columns: function() {
      return buildColumns(this.schema, this.powerT)
    }
  },
  created() {
    this.getList()
  },
  methods: {
    append(data) {
      this.list.unshift(data)
      this.$notify({ title: '成功', message: '创建成功', type: 'success', duration: 2000 })
    },
    replace(data) {
      for (const v of this.list) {
        if (v.id === data.id) {
          const index = this.list.indexOf(v)
          this.list.splice(index, 1, data)
          break
        }
      }
      this.$notify({ title: '成功', message: '更新成功', type: 'success', duration: 2000 })
    },
    delete(id) {
      for (const v of this.list) {
        if (v.id === id) {
          const index = this.list.indexOf(v)
          this.list.splice(index, 1)
          break
        }
      }
      this.$notify({ title: '成功', message: '删除成功', type: 'success', duration: 2000 })
    },
    getColumnValue(data, key) {
      return { key: data[key] }
    },
    getList() {
      this.listLoading = true
      this.listAction(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    clickSearch() {
      this.listQuery.page = 1
      this.$emit('table-search')
      this.getList()
    },
    clickAdd() {
      this.$emit('table-add')
    },
    clickInnerFilter() {
      this.$emit('inner-filter')
    },
    clickRowUpdate(row) {
      const data = Object.assign({}, row)
      this.$emit('row-update', data)
    },
    clickRowDelete(row) {
      const data = Object.assign({}, row)
      this.$emit('row-delete', data)
    },
    rowClick(row) {
      if (this.allowSelect) {
        this.$refs.table.toggleRowSelection(row)
      }
    },
    selectionChange(data) {
      this.selected = data
    },
    powerT
  }
}
</script>
