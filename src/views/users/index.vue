<template>
  <div class="app-container">
    <common-list :list-action="listUserAction">
      <template slot="columns">
        <el-table-column :label="$t('table.id')" align="center" width="65">
          <template slot-scope="scope">
            <span>{{ scope.row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column label="名称" min-width="110px">
          <template slot-scope="scope">
            <!-- <span class="link-type" @click="handleUpdate(scope.row)">{{ scope.row.name }}</span> -->
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
      </template>
    </common-list>
  </div>
</template>

<script>
import { fetchList } from '@/api/user'
import UserForm from './components/form'
import CommonList from '@/components/CommonList'

export default {
  name: 'UserIndex',
  components: { CommonList, UserForm },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: null,
      listUserAction: fetchList
      // userFormVisible: false,
      // formStatus: 'create',
      // listQuery: {
      //   page: 1,
      //   limit: 20,
      //   name: undefined,
      //   sort: '+id'
      // }
    }
  },
  methods: {
    // fetchUserList() {
    //   fetchList().then(response => {
    //     this.list = response.data.items
    //     this.total = response.data.total
    //     setTimeout(() => { this.listLoading = false }, 1.5 * 1000) })
    // }
    // handleCreatedUser(addedUser) {
    //   this.list.unshift(addedUser)
    // },
    // handleUpdatedUser(user) {
    //   for (const v of this.list) {
    //     if (v.id === user.id) {
    //       const index = this.list.indexOf(v)
    //       this.list.splice(index, 1, user)
    //       break
    //     }
    //   }
    // },
    // handleCreate() {
    //   this.$refs['userForm'].resetTemp()
    //   this.userFormVisible = true

    //   this.$nextTick(() => {
    //     // this.$refs['dataForm'].clearValidate()
    //   })
    // },
    // handleUpdate(row) {
    //   const user = Object.assign({}, row)

    //   this.formStatus = 'update'
    //   this.userFormVisible = true
    //   this.$refs['userForm'].temp = user

    //   this.$nextTick(() => {
    //     // this.$refs['dataForm'].clearValidate()
    //   })
    // },
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
