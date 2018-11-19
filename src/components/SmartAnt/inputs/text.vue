<template>
  <el-input
    v-model="goat"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :size="size"
    @input="handleInput" />
</template>
<script>
import mixin from '../mixin/input.js'

export default {
  name: 'TextInput',
  mixins: [mixin],
  props: {
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
