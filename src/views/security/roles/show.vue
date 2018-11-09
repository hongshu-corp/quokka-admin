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
  </div>
</template>

<script>
import * as Crud from '@/api/crud'
import SmartShow from '@/components/SmartAnt/show'

export default {
  name: 'RoleDetail',
  components: { SmartShow },
  data() {
    return {
      table: 'roles',

      listRoleAction: (query) => Crud.list(this.table, query),
      updateRoleAction: (query) => Crud.update(this.table, query),
      deleteRoleAction: (id) => Crud.destroy(this.table, id),
      detailRoleAction: (id) => Crud.detail(this.table, id),

      roles: []
    }
  },
  methods: {
  }
}
</script>
