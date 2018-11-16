<template>
  <div>
    <smart-input
      v-for="(item, key) in searchForm"
      v-bind="item"
      :key="key"
      :prop="key"
      :model="value"
      :schema="item"
      style="margin-right:5px;" />
    <slot />
    <el-button class="filter-item" type="primary" icon="el-icon-search" @click="clickSearch">{{ $t('table.search') }}</el-button>
    <el-button class="filter-item" type="default" icon="el-icon-delete" @click="clickClear">{{ $t('table.clear') }}</el-button>
  </div>
</template>

<script>
import SmartInput from './inputs'
import { buildSearchForm } from './helpers/builder'
import { powerT } from './helpers/powerT'

export default {
  components: { SmartInput },
  props: {
    value: {
      type: Object,
      default: () => {}
    },
    schema: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    searchForm: function() {
      return buildSearchForm(this.schema, this.powerT)
    }
  },
  methods: {
    clickSearch() {
      this.$emit('form-search')
    },
    clickClear() {
      this.$emit('form-clear')
    },
    powerT
  }
}
</script>
