<template>
  <div class="app-container">
    <smart-list
      ref="permissionList"
      :list-action="listPermissionAction"
      :create-action="createPermissionAction"
      :update-action="updatePermissionAction"
      :delete-action="deletePermissionAction"
      :model="permission"
      :name="table"
      allow-add
      allow-edit
      allow-delete
      allow-search
      @setModel="setPermissionModel">

      <template slot="filter" slot-scope="scope">
        <el-input
          :placeholder="$t('attributes.common.name')"
          v-model="scope.name"
          class="filter-item filter-name"
          @input="updateQuery(scope)"
          @keyup.enter.native="handleFilter" />
      </template>

    </smart-list>
  </div>
</template>

<script>
import * as Crud from '@/api/crud'
import SmartList from '@/components/SmartAnt/list'
import { buildModel } from '@/components/SmartAnt/helpers/builder'

export default {
  name: 'PermissionIndex',
  components: { SmartList },
  data() {
    return {
      table: 'permissions',

      listPermissionAction: (query) => Crud.list(this.table, query),
      createPermissionAction: (query) => Crud.create(this.table, query),
      updatePermissionAction: (query) => Crud.update(this.table, query),
      deletePermissionAction: (id) => Crud.destroy(this.table, id),

      permission: this.getModel()
    }
  },
  methods: {
    getModel() {
      return buildModel(this.$store.state.schema.data.permissions)
    },
    setPermissionModel(model) {
      this.permission = model
    },
    handleFilter() {
      this.$refs['permissionList'].handleFilter()
    },
    updateQuery(scope) {
      this.$refs['permissionList'].listQuery = this.$_.merge(this.$refs['permissionList'].listQuery, scope)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-name {
  width: 200px;
}
</style>
