<template>
  <div class="app-container">
    <common-list :list-action="listUserAction" :model-temp="tempUser" @resetTemp="resetTempUser">
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

      <template slot="form" slot-scope="form">
        <el-form-item :label="$t('attributes.common.name')" prop="name">
          <el-input v-model="form.name"/>
        </el-form-item>
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
      // userFormVisible: false,
      listUserAction: fetchList,
      tempUser: {
        name: ''
      }
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
    resetTempUser() {
      this.tempUser = {
        name: ''
      }
    }
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
