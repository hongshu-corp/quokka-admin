<template>
  <div class="detail-container">
    <smart-show
      ref="roleShow"
      :list-action="listRoleAction"
      :update-action="updateRoleAction"
      :delete-action="deleteRoleAction"
      :detail-action="detailRoleAction"
      :name="table"
      index-path="/security/roles"
      allow-edit
      allow-delete>

      <span />

    </smart-show>

    <el-card>
      <smart-list
        ref="userList"
        :list-action="listUserAction"
        :create-action="createUserAction"
        :update-action="updateUserAction"
        :delete-action="deleteUserAction"
        :inner-search-action="innerSearchUserAction"
        :model="user"
        :name="userTable"
        allow-edit
        allow-delete
        allow-inner-search
        show-path="/security/users"
        delete-button-text="移除"
        @inner-search-confirmed="addUsersToCurrentRole"
        @setModel="setUserModel">

        <span />

      </smart-list>
    </el-card>
  </div>
</template>

<script>
import * as Crud from '@/api/crud'
import SmartShow from '@/components/SmartAnt/show'
import SmartList from '@/components/SmartAnt/list'
import { buildModel } from '@/components/SmartAnt/helpers/builder'

export default {
  name: 'RoleDetail',
  components: { SmartShow, SmartList },
  data() {
    return {
      table: 'roles',
      userTable: 'users',

      listRoleAction: (query) => Crud.list(this.table, query),
      updateRoleAction: (query) => Crud.update(this.table, query),
      deleteRoleAction: (id) => Crud.destroy(this.table, id),
      detailRoleAction: (id) => Crud.detail(this.table, id),

      listUserAction: (query) => Crud.nested_list(this.table, this.getId(), this.userTable, query),
      createUserAction: (query) => Crud.create(this.userTable, query),
      updateUserAction: (query) => Crud.update(this.userTable, query),
      deleteUserAction: (id) => Crud.nested_destroy(this.table, this.getId(), this.userTable, id),

      innerSearchUserAction: (query) => Crud.list(this.userTable, query),

      roles: [],
      user: this.getUserModel()
    }
  },
  methods: {
    getUserModel() {
      var schema = this.$store.state.schema.data.users
      return buildModel(schema)
    },
    setUserModel(model) {
      this.user = model
    },
    getId() {
      return this.$route.params && this.$route.params.id
    },
    addUsersToCurrentRole(data) {
      console.log(data)
    }
  }
}
</script>
