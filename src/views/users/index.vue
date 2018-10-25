<template>
  <div class="app-container">
    <common-list
      ref="userList"
      :list-action="listUserAction"
      :create-action="createUserAction"
      :update-action="updateUserAction"
      :delete-action="deleteUserAction"
      :model="user"
      :schema="schema"
      confirm-text="确认要删除该用户吗？"
      model-name="user"
      allow-add
      allow-edit
      allow-delete
      @setModel="setUserModel">

      <!-- <el-table-column :label="$t('table.id')" align="center" width="65">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('attributes.common.name')">
        <template slot-scope="scope">
          <span class="link-type" @click="scope._self.handleUpdate(scope.row)">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('attributes.common.email')" min-width="110px">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('attributes.common.createdTime')" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createdTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column> -->

      <!-- The dialog contents-->
      <!-- <template slot="form" slot-scope="form">
        <el-form-item :label="$t('attributes.common.name')" prop="name">
          <el-input v-model="user.name"/>
        </el-form-item>
        <el-form-item :label="$t('attributes.common.email')" prop="email">
          <el-input v-model="user.email"/>
        </el-form-item>
        <el-form-item :label="$t('attributes.common.password')" prop="password">
          <el-input v-model="user.password" type="password"/>
        </el-form-item>
      </template> -->
    </common-list>
  </div>
</template>

<script>
import * as User from '@/api/user'
import CommonList from '@/components/CommonList'
import { buildModel } from '@/components/CommonList/builder'

export default {
  name: 'UserIndex',
  components: { CommonList },
  data() {
    return {
      listUserAction: User.list,
      createUserAction: User.create,
      updateUserAction: User.update,
      deleteUserAction: User.destroy,

      schema: this.getSchema(),
      user: this.getModel()
    }
  },
  methods: {
    getModel() {
      return buildModel(this.getSchema())
    },
    getSchema() {
      return {
        id: {
          column: {
            type: 'text',
            width: '65px'
          },
          default: undefined
        },
        name: {
          column: {
            type: 'text',
            width: '100px'
          },
          form: {
            type: 'text'
          },
          default: '',
          rules: [{
            required: true,
            message: '名称是必须的',
            trigger: 'blur'
          }]
        },
        email: {
          column: {
            type: 'text',
            minWidth: '100px'
          },
          form: {
            type: 'text'
          },
          default: '',
          rules: [{
            required: true,
            message: '邮箱是必须的',
            trigger: 'blur'
          }]
        },
        password: {
          form: {
            type: 'password'
          },
          default: '',
          rules: [{
            required: true,
            message: '密码是必须的',
            trigger: 'blur'
          }]
        }
      }
    },
    setUserModel(model) {
      this.user = model
    }
  }
}
</script>
