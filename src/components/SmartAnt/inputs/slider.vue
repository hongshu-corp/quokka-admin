<template>
  <el-slider
    v-model="goat"
    :name="name"
    :placeholder="placeholder"
    :step="step"
    :min="min"
    :max="max"
    @change="handleChange" />
</template>
<script>
import mixin from '../mixin/input.js'

export default {
  name: 'SliderInput',
  mixins: [mixin],
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: undefined
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
