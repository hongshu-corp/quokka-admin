<template>
  <el-switch
    :value="value"
    :active-value="activeValue"
    :inactive-value="inactiveValue"
    :active-text="activeText"
    :inactive-text="inactiveText"
    @change="handleChange" />
</template>
<script>
export default {
  name: 'SwitchInput',
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
