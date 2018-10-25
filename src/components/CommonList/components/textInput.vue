<template>
  <el-input
    :value="value"
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
    }
  },
  methods: {
    handleInput(value) {
      this.$emit('input', value)
    }
  }
}
</script>
