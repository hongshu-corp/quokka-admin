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
      allow-add
      allow-edit
      allow-delete
      allow-search
      @setModel="setUserModel">

      <template slot="filter" slot-scope="scope">
        <el-input
          :placeholder="$t('attributes.common.name')"
          v-model="scope.name"
          class="filter-item filter-name"
          @input="updateQuery(scope)"
          @keyup.enter.native="handleFilter" />
        <el-input
          :placeholder="$t('attributes.common.email')"
          v-model="scope.email"
          class="filter-item filter-name"
          @input="updateQuery(scope)"
          @keyup.enter.native="handleFilter" />
      </template>

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
        name: 'user',
        props: {
          id: {
            default: undefined,
            column: {
              type: 'text',
              width: '50px'
            }
          },
          name: {
            default: '',
            column: {
              type: 'linkUpdate',
              width: '100px'
            },
            form: {
              type: 'text',
              rules: [{
                required: true,
                message: '名称是必须的',
                trigger: 'blur'
              }]
            }
          },
          email: {
            default: '',
            column: {
              type: 'map',
              minWidth: '100px',
              options: [{
                label: 'msn',
                value: 'tsuijy@msn.com'
              },
              {
                label: 'gmail',
                value: 'tsuijy@gmail.com'
              }]
            },
            form: {
              type: 'select',
              rules: [{
                required: true,
                message: '邮箱是必须的',
                trigger: 'blur'
              }],
              options: [{
                label: 'msn',
                value: 'tsuijy@msn.com'
              },
              {
                label: 'gmail',
                value: 'tsuijy@gmail.com'
              }]
            }
          },
          password: {
            default: '',
            form: {
              type: 'password',
              placeholder: 'please input',
              rules: [{
                required: true,
                message: '密码是必须的',
                trigger: 'blur'
              }]
            }
          },
          createdTime: {
            default: '',
            column: {
              type: 'datetime',
              width: '140px'
            }
          }
        }
      }
    },
    setUserModel(model) {
      this.user = model
    },
    handleFilter() {
      this.$refs['userList'].handleFilter()
    },
    updateQuery(scope) {
      this.$refs['userList'].listQuery = this.$_.merge(this.$refs['userList'].listQuery, scope)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-name {
  width: 200px;
}
</style>

