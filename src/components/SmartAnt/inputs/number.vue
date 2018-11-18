<template>
  <el-input-number
    :name="name"
    :value="value"
    :step="step"
    :min="min"
    :max="max"
    :precision="precision"
    :placeholder="placeholder"
    @input="handleInput" />
</template>
<script>
export default {
  name: 'InputNumber',
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
      default: ''
    },
    step: {
      type: Number,
      default: 1
    },
    precision: {
      type: Number,
      default: undefined
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
