<template>
  <el-select
    v-model="goat"
    :placeholder="placeholder"
    :disabled="disabled"
    :size="size"
    filterable
    @change="handleInput">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value" />
  </el-select>
</template>
<script>
import mixin from '../mixin/input'

export default {
  name: 'SelectInput',
  mixins: [mixin],
  props: {
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleInput(selected) {
      this.$emit('input', selected)
    }
  }
}
</script>
