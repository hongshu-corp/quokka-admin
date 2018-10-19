<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <div class="createUser-main-container">
        <el-row>
          <el-col :span="12">
            <el-form-item prop="name">
              <MDinput v-model="postForm.name" :maxlength="100" name="name" required>
                名称
              </MDinput>
            </el-form-item>
            <el-form-item prop="email">
              <MDinput v-model="postForm.email" :maxlength="100" name="email" required>
                邮箱
              </MDinput>
            </el-form-item>
            <el-form-item prop="password">
              <MDinput v-model="postForm.password" type="password" name="password" required>
                密码
              </MDinput>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-button v-loading="loading" style="margin-left: 10px;" type="primary" @click="submitForm">保存
      </el-button>
    </el-form>

  </div>
</template>

<script>
import MDinput from '@/components/MDinput'
import Sticky from '@/components/Sticky'
import { fetchArticle } from '@/api/article'

const defaultForm = {
  name: '',
  email: '',
  password: '',
  id: undefined
}

export default {
  name: 'UserForm',
  components: { MDinput, Sticky },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      userListOptions: [],
      rules: {
        name: [{ validator: validateRequire }],
        email: [{ validator: validateRequire }],
        password: [{ validator: validateRequire }]
      }
    }
  },
  computed: {
    lang() {
      return this.$store.getters.language
    }
  },
  created() {
    if (this.isEdit) {
      const id = this.$route.params && this.$route.params.id
      this.fetchData(id)
    } else {
      this.postForm = Object.assign({}, defaultForm)
    }
  },
  methods: {
    fetchData(id) {
      fetchArticle(id).then(response => {
        this.postForm = response.data
        // Just for test
        this.postForm.title += `   User Id:${this.postForm.id}`
      }).catch(err => {
        console.log(err)
      })
    },
    submitForm() {
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$notify({
            title: '成功',
            message: '保存用户成功',
            type: 'success',
            duration: 2000
          })
          this.loading = false
          this.$router.push({ path: '/users' })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.createUser-main-container {
  padding: 10px;
  .postInfo-container {
    position: relative;
    @include clearfix;
    margin-bottom: 10px;
    .postInfo-container-item {
      float: left;
    }
  }
  .editor-container {
    min-height: 500px;
    margin: 0 0 30px;
  }
}
</style>
