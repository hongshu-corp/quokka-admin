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

      <slot />

      <el-table-column :label="$t('table.actions')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">{{ $t('table.edit') }}</el-button>
          <!-- <el-button size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">{{ $t('table.delete') }} -->
          <!-- </el-button> -->

          <slot name="extra-buttons"/>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination v-show="total>0" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" :total="total" background layout="total, sizes, prev, pager, next, jumper" @size-change="handleSizeChange" @current-change="handleCurrentChange"/>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="formVisible">
      <el-form ref="dataForm" :rules="rules" :model.sync="modelTemp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <slot name="form" />
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import waves from '@/directive/waves' // 水波纹指令

export default {
  name: 'CommonList',
  filters: { },
  directives: {
    waves
  },
  props: {
    modelTemp: {
      type: Object,
      default: null
    },
    allowAdd: {
      type: Boolean,
      default: true
    },
    listAction: {
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
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      rules: { },
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
      this.$emit('resetTemp')
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    handleUpdate(row) {
      // const user = Object.assign({}, row)

      // this.formStatus = 'update'
      // this.userFormVisible = true
      // this.$refs['userForm'].temp = user

      // this.$nextTick(() => {
      //   // this.$refs['dataForm'].clearValidate()
      // })
    }
    // handleDelete(row) {
    //   this.$notify({
    //     title: '成功',
    //     message: '删除成功',
    //     type: 'success',
    //     duration: 2000
    //   })
    //   const index = this.list.indexOf(row)
    //   this.list.splice(index, 1)
    // }
  }
}
</script>
