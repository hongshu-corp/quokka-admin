<template>
  <div class="app-container">
    <smart-list
      ref="userList"
      :list-action="listUserAction"
      :create-action="createUserAction"
      :update-action="updateUserAction"
      :delete-action="deleteUserAction"
      :model="user"
      :name="table"
      allow-add
      allow-edit
      allow-delete
      allow-search
      show-path="/security/users"
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

      <template slot="form" slot-scope="scope">
        <el-form-item :label="$t('model.role')" prop="roles">
          <el-checkbox-group v-model="user.roles">
            <el-checkbox v-for="role in roles" :label="role.id" :key="role.name">{{ role.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </template>

    </smart-list>
  </div>
</template>

<script>
import * as Crud from '@/api/crud'
import SmartList from '@/components/SmartAnt/list'
import { buildModel } from '@/components/CommonList/builder'

export default {
  name: 'UserIndex',
  components: { SmartList },
  data() {
    return {
      table: 'users',

      listUserAction: (query) => Crud.list(this.table, query),
      createUserAction: (query) => Crud.create(this.table, query),
      updateUserAction: (query) => Crud.update(this.table, query),
      deleteUserAction: (id) => Crud.destroy(this.table, id),

      user: this.getModel(),
      roles: []
    }
  },
  created() {
    this.getRoles()
  },
  methods: {
    getModel() {
      var schema = this.$store.state.schema.data.users
      return buildModel(schema)
    },
    setUserModel(model) {
      this.user = model
    },
    handleFilter() {
      this.$refs['userList'].handleFilter()
    },
    updateQuery(scope) {
      this.$refs['userList'].listQuery = this.$_.merge(this.$refs['userList'].listQuery, scope)
    },
    getRoles() {
      Crud.list('roles', {}).then(response => {
        this.roles = response.data.items
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-name {
  width: 200px;
}
</style>

