<template>
  <el-slider
    v-model="goat"
    :name="name"
    :placeholder="placeholder"
    :step="step"
    :min="min"
    :max="max"
    :input-size="size"
    :disabled="disabled"
    @change="handleChange" />
</template>
<script>
import mixin from '../mixin/input.js'

export default {
  name: 'SliderInput',
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
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 100
    }
  },
  methods: {
    handleChange(value) {
      this.$emit('change', value)
      this.$emit('input', value)
    }
  }
}
</script>
