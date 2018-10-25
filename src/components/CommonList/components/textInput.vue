<template>
  <el-input
    :value="value"
    :type="type"
    :placeholder="placeholder"
    @input="handleInput" />
</template>
<script>
export default {
  name: 'TextInput',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  methods: {
    handleInput(value) {
      this.$emit('input', value)
    }
  }
}
</script>
