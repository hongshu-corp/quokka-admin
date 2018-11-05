<template>
  <div class="app-container">
    <common-list
      ref="roleList"
      :list-action="listRoleAction"
      :create-action="createRoleAction"
      :update-action="updateRoleAction"
      :delete-action="deleteRoleAction"
      :model="role"
      :schema="schema"
      allow-add
      allow-edit
      allow-delete
      allow-search
      @setModel="setRoleModel">

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
import * as Role from '@/api/role'
import CommonList from '@/components/CommonList'
import { buildModel } from '@/components/CommonList/builder'

export default {
  name: 'RoleIndex',
  components: { CommonList },
  data() {
    return {
      listRoleAction: Role.list,
      createRoleAction: Role.create,
      updateRoleAction: Role.update,
      deleteRoleAction: Role.destroy,

      schema: this.getSchema(),
      role: this.getModel()
    }
  },
  methods: {
    getModel() {
      return buildModel(this.getSchema())
    },
    getSchema() {
      return {
        name: 'role',
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
