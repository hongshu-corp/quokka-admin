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
        :model="user"
        :name="userTable"
        allow-edit
        allow-delete
        show-path="/security/users"
        delete-button-text="移除"
        @setModel="setUserModel">

        <template slot="filter" slot-scope="scope">
          <el-button class="" style="margin-left: 10px;" type="warning" icon="el-icon-edit" @click="popUpSearch">{{ $t('table.add') }}</el-button>

        </template>

        <template slot="expand" slot-scope="scope">
          <el-dialog :visible.sync="searchVisible" title="查找用户">
            <el-input
              :placeholder="$t('attributes.common.name')"
              v-model="searchForm.name"
              style="width: 200px"
              @keyup.enter.native="handleSearch" />
            <el-button class="" style="margin-left: 10px;" type="warning" icon="el-icon-edit" @click="handleSearch">{{ $t('table.search') }}</el-button>

            <el-table
              v-loading="searchLoading"
              :data="searchedList"
              border
              fit
              highlight-current-row
              stripe
              style="width: 100%; margin-top: 10px">
              <el-table-column :label="$t('table.author')" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.name }}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('table.author')" align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.email }}</span>
                </template>
              </el-table-column>
            </el-table>

            <div slot="footer" class="dialog-footer">
              <el-button @click="searchVisible = false">{{ $t('table.cancel') }}</el-button>
              <el-button type="warning" @click="searchConfirm">{{ $t('table.confirm') }}</el-button>
            </div>
          </el-dialog>
        </template>
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

      roles: [],
      user: this.getUserModel(),

      // search
      searchVisible: false,
      searchLoading: false,
      searchForm: {},
      searchedList: []
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
    popUpSearch() {
      this.searchVisible = true
    },
    handleSearch() {
      this.searchLoading = true
      Crud.list(this.userTable, {}).then(response => {
        this.searchedList = response.data.items

        setTimeout(() => {
          this.searchLoading = false
        }, 500)
      })
    },
    searchConfirm() {
      console.log('confirmed')
    }
  }
}
</script>
