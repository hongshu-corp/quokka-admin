<template>
  <div class="detail-container">
    <smart-show
      ref="userShow"
      :list-action="listUserAction"
      :update-action="updateUserAction"
      :delete-action="deleteUserAction"
      :detail-action="detailUserAction"
      :name="table"
      index-path="/security/users"
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
  name: 'UserDetail',
  components: { SmartShow },
  data() {
    return {
      table: 'users',

      listUserAction: (query) => Crud.list(this.table, query),
      updateUserAction: (query) => Crud.update(this.table, query),
      deleteUserAction: (id) => Crud.destroy(this.table, id),
      detailUserAction: (id) => Crud.detail(this.table, id),

      roles: []
    }
  },
  methods: {
  }
}
</script>
