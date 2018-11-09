<template>
  <div class="app-container">
    <smart-list
      ref="roleList"
      :list-action="listRoleAction"
      :create-action="createRoleAction"
      :update-action="updateRoleAction"
      :delete-action="deleteRoleAction"
      :model="role"
      :name="table"
      allow-add
      allow-edit
      allow-delete
      allow-search
      show-path="/security/roles"
      @setModel="setRoleModel">

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
  name: 'RoleIndex',
  components: { SmartList },
  data() {
    return {
      table: 'roles',

      listRoleAction: (query) => Crud.list(this.table, query),
      createRoleAction: (query) => Crud.create(this.table, query),
      updateRoleAction: (query) => Crud.update(this.table, query),
      deleteRoleAction: (id) => Crud.destroy(this.table, id),

      role: this.getModel()
    }
  },
  methods: {
    getModel() {
      return buildModel(this.$store.state.schema.data.roles)
    },
    setRoleModel(model) {
      this.role = model
    },
    handleFilter() {
      this.$refs['roleList'].handleFilter()
    },
    updateQuery(scope) {
      this.$refs['roleList'].listQuery = this.$_.merge(this.$refs['roleList'].listQuery, scope)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-name {
  width: 200px;
}
</style>
