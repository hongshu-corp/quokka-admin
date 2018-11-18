<template>
  <el-input-number
    :value="value"
    :step="step"
    :min="min"
    :max="max"
    :placeholder="placeholder"
    @input="handleInput" />
</template>
<script>
export default {
  name: 'InputNumber',
  props: {
    value: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: ''
    },
    step: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: Infinity
    }
  },
  methods: {
    handleInput(value) {
      this.$emit('input', value)
    }
  }
}
</script>
