<template>
  <el-time-select
    v-model="goat"
    :name="name"
    :picker-options="options"
    :placeholder="placeholder"
    :size="size"
    @change="handleChange" />
</template>
<script>
import mixin from '../mixin/input.js'

export default {
  name: 'TimeInput',
  mixins: [mixin],
  props: {
    name: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: undefined
    },
    size: {
      type: String,
      default: 'small'
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
