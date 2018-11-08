<template>
  <div class="detail-container">

    <el-row :gutter="32">
      <el-col :xs="24">
        <div class="card-wrapper">
          <el-card shadow="always">
            <div slot="header" class="clearfix">
              <b class="">用户详情</b>
            </div>
            <div class="item">
              <span class="title">{{ $t("attributes.common.name") }}:</span>
              <span>{{ user.name }}</span>
            </div>
            <div class="item">
              <span class="title">{{ $t("attributes.common.email") }}:</span>
              <span>{{ user.email }}</span>
            </div>
            <div class="item">
              <span class="title">{{ $t("attributes.common.createdTime") }}:</span>
              <span>{{ parseTime(user.createdTime, '{y}-{m}-{d} {h}:{i}') }}</span>
            </div>
            <div class="item">
              <span class="title">{{ $t("attributes.common.updatedTime") }}:</span>
              <span>{{ parseTime(user.updatedTime, '{y}-{m}-{d} {h}:{i}') }}</span>
            </div>
            <div class="item">
              <span class="title">{{ $t("model.role") }}:</span>
              <span>{{ user.roles }}</span>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="8">
        <div class="card-wrapper">
          <el-card shadow="always">
            其他信息
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import * as Crud from '@/api/crud'
import { parseTime as ps } from '@/utils'

export default {
  name: 'UserDetail',
  data() {
    return {
      user: {},
      tempRoute: {}
    }
  },
  computed: {
    lang() {
      return this.$store.getters.language
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    this.fetchData(id)

    this.tempRoute = Object.assign({}, this.$route)
  },
  methods: {
    fetchData(id) {
      Crud.detail('users', id).then(response => {
        this.user = response.data

        this.setTagTitle()
      })
    },
    setTagTitle() {
      const title = this.lang === 'zh' ? '用户详情' : 'User Detail'
      const route = Object.assign({}, this.tempRoute, { title: `${title}-${this.user.id}` })

      this.$store.dispatch('updateVisitedView', route)
    },
    parseTime(t) {
      return ps(t)
    }
  }
}
</script>

<style rel="stylesheets/scss" lang="scss" scoped>

.card-wrapper {
  padding:16px 16px 0;
}

.item {
  height: 25px;
}

.title {
  width: 150px;
  display: inline-block;
  font-weight: bold;
  text-align: left;
}

</style>

