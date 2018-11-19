<template>
  <el-switch
    v-model="goat"
    :active-value="activeValue"
    :inactive-value="inactiveValue"
    :active-text="activeText"
    :inactive-text="inactiveText"
    :disabled="disabled"
    @change="handleChange" />
</template>
<script>
import mixin from '../mixin/input'

export default {
  name: 'SwitchInput',
  mixins: [mixin],
  props: {
    // eslint-disable-next-line
    value: [Boolean, String, Number],
    // eslint-disable-next-line
    activeValue: [Boolean, String, Number],
    // eslint-disable-next-line
    inactiveValue: [Boolean, String, Number],
    activeText: {
      type: String,
      default: undefined
    },
    inactiveText: {
      type: String,
      default: undefined
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
