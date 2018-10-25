<template>
  <el-input
    :value="value"
    :placeholder="placeholder"
    type="password"
    @input="handleInput" />
</template>
<script>
export default {
  name: 'PasswordInput',
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
