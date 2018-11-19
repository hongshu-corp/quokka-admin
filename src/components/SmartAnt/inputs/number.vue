<template>
  <el-input-number
    v-model="goat"
    :name="name"
    :step="step"
    :min="min"
    :max="max"
    :disabled="disabled"
    :precision="precision"
    :placeholder="placeholder"
    @input="handleInput" />
</template>
<script>
import mixin from '../mixin/input'

export default {
  name: 'InputNumber',
  mixins: [mixin],
  props: {
    value: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    },
    precision: {
      type: Number,
      default: undefined
    }
  },
  methods: {
    handleInput(value) {
      this.$emit('input', value)
    }
  }
}
</script>
