<template>
  <div class="app-container">
    <smart-list
      ref="formList"
      :list-action="listUserAction"
      :create-action="createUserAction"
      :update-action="updateUserAction"
      :delete-action="deleteUserAction"
      :model="form"
      :name="table"
      allow-add
      allow-edit
      allow-select-rows
      @setModel="setUserModel">

      <template slot="form-search">
        <!-- your custom here -->
      </template>
    </smart-list>
  </div>
</template>

<script>
import * as Crud from '@/api/crud'
import SmartList from '@/components/SmartAnt/list'
import { buildModel } from '@/components/SmartAnt/helpers/builder'

export default {
  name: 'Formtest',
  components: { SmartList },
  data() {
    return {
      table: 'forms',

      listUserAction: (query) => Crud.list('users', query),
      createUserAction: (query) => { console.log(query) },
      updateUserAction: (query) => {},
      deleteUserAction: (id) => {},

      form: this.getModel()
    }
  },
  methods: {
    getModel() {
      var schema = this.$store.state.schema.data.forms
      return buildModel(schema)
    },
    setUserModel(model) {
      this.form = model
    },
    handleFilter() {
      this.$refs['formList'].handleFilter()
    },
    updateQuery(scope) {
      this.$refs['formList'].listQuery = this.$_.merge(this.$refs.formList.listQuery, scope)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-name {
  width: 200px;
}
</style>

