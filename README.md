# 元年金服后台项目

## 开始
yarn

yarn dev


## Common List 组件

该组件支持两种方式：

* schema 方式定义
* vue 文件内嵌

### schema 方式
举例如下：
``` vue
<template>
  <div class="app-container">
    <smart-list
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
      @resetModel="resetUserModel"
      @setModel="setUserModel">
      </smart-list>
  </div>
</template>

<script>
import * as User from '@/api/user'
import SmartAnt/list from '@/components/SmartAnt/list'
import { buildModel } from '@/components/SmartAnt/helpers/builder'

export default {
  name: 'UserIndex',
  components: { SmartList },
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
              width: '65px'
            }
          },
          name: {
            default: '',
            column: {
              type: 'text',
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
              type: 'text',
              minWidth: '100px'
            },
            form: {
              type: 'text',
              rules: [{
                required: true,
                message: '邮箱是必须的',
                trigger: 'blur'
              }]
            }
          },
          password: {
            default: '',
            form: {
              type: 'password',
              rules: [{
                required: true,
                message: '密码是必须的',
                trigger: 'blur'
              }]
            }
          }
        }
      }
    },
    setUserModel(model) {
      this.user = model
    }
  }
}
</script>

```

### 内嵌方式
举例如下：
``` vue
<template>
  <div class="app-container">
    <smart-list
      ref="userList"
      :list-action="listUserAction"
      :create-action="createUserAction"
      :update-action="updateUserAction"
      :delete-action="deleteUserAction"
      :model="user"
      :rules="userRules"
      confirm-text="确认要删除该用户吗？"
      model-name="user"
      allow-add
      allow-edit
      allow-delete
      @resetModel="resetUserModel"
      @setModel="setUserModel">

      <el-table-column :label="$t('table.id')" align="center" width="65">
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
      </el-table-column>

      <!-- The dialog contents-->
      <template slot="form" slot-scope="form">
        <el-form-item :label="$t('attributes.common.name')" prop="name">
          <el-input v-model="user.name"/>
        </el-form-item>
        <el-form-item :label="$t('attributes.common.email')" prop="email">
          <el-input v-model="user.email"/>
        </el-form-item>
        <el-form-item :label="$t('attributes.common.password')" prop="password">
          <el-input v-model="user.password" type="password"/>
        </el-form-item>
      </template>
    </smart-list>
  </div>
</template>

<script>
import { fetchList, createUser, updateUser, deleteUser } from '@/api/user'
import SmartList from '@/components/SmartAnt/list'

export default {
  name: 'UserIndex',
  components: { SmartList },

  data() {
    return {
      listUserAction: fetchList,
      createUserAction: createUser,
      updateUserAction: updateUser,
      deleteUserAction: deleteUser,
      user: this.getModel(),
      userRules: this.getRules()
    }
  },
  methods: {
    getModel() {
      return {
        id: undefined,
        name: 'tom'
      }
    },
    getRules() {
      return {
        type: [{ required: true, message: 'type is required', trigger: 'change' }],
        timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
        title: [{ required: true, message: 'title is required', trigger: 'blur' }]
      }
    }
  }
}
</script>

```
