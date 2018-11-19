<template>
  <el-time-select
    v-model="goat"
    :name="name"
    :picker-options="options"
    :placeholder="placeholder"
    :size="size"
    :disabled="disabled"
    @change="handleChange" />
</template>
<script>
import mixin from '../mixin/input.js'

export default {
  name: 'TimeInput',
  mixins: [mixin],
  props: {
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default: function() {
        return {
          start: '08:00',
          end: '19:00',
          step: '00:30'
        }
      }
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
