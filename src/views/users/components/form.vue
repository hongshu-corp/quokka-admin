<template>
  <el-dialog :title="title" :visible.sync="visible" :show="show" @close="$emit('update:show', false)">
    <el-form ref="dataForm" :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
      <el-form-item :label="$t('attributes.common.name')" prop="name">
        <el-input v-model="temp.name"/>
      </el-form-item>
      <el-form-item :label="$t('attributes.common.email')" prop="email">
        <el-input v-model="temp.email"/>
      </el-form-item>
      <el-form-item :label="$t('attributes.common.password')" prop="password">
        <el-input v-model="temp.password" type="password"/>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">{{ $t('table.cancel') }}</el-button>
      <el-button type="primary" @click="status==='create'?createData():updateData()">{{ $t('table.confirm') }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createUser, updateUser } from '@/api/user'

export default {
  name: 'UserForm',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: 'create'
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: this.show,
      temp: {
        name: '',
        email: '',
        password: ''
      },
      rules: {
        name: [{ required: true, message: 'name is required', trigger: 'blur' }],
        email: [{ required: true, message: 'email is required', trigger: 'blur' }],
        password: [{ required: true, message: 'password is required', trigger: 'blur' }]
      }
    }
  },
  watch: {
    show() {
      this.visible = this.show
    }
  },
  methods: {
    resetTemp() {
      this.temp = {
        id: undefined,
        name: '',
        email: '',
        password: ''
      }
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 10000) + 1024 // mock a id
          createUser(this.temp).then(() => {
            // this.list.unshift(this.temp)
            this.$emit('createdUser', this.temp)
            this.status = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateUser(tempData).then(() => {
            this.$emit('updatedUser', this.temp)
            this.visible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
