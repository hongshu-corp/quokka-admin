<template>
  <div class="app-container">
    <common-list
      ref="permissionList"
      :list-action="listPermissionAction"
      :create-action="createPermissionAction"
      :update-action="updatePermissionAction"
      :delete-action="deletePermissionAction"
      :model="permission"
      :schema="schema"
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

    </common-list>
  </div>
</template>

<script>
import * as Crud from '@/api/crud'
import CommonList from '@/components/CommonList'
import { buildModel } from '@/components/CommonList/builder'

export default {
  name: 'PermissionIndex',
  components: { CommonList },
  data() {
    return {
      table: 'permissions',

      listPermissionAction: (query) => Crud.list(this.table, query),
      createPermissionAction: (query) => Crud.create(this.table, query),
      updatePermissionAction: (query) => Crud.update(this.table, query),
      deletePermissionAction: (id) => Crud.destroy(this.table, id),

      schema: this.getSchema(),
      permission: this.getModel()
    }
  },
  methods: {
    getModel() {
      return buildModel(this.getSchema())
    },
    getSchema() {
      return {
        name: 'permission',
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
              type: 'linkUpdate'
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
          createdTime: {
            default: '',
            column: {
              type: 'datetime',
              width: '140px'
            }
          },
          updatedTime: {
            default: '',
            column: {
              type: 'datetime',
              width: '140px'
            }
          }
        }
      }
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
