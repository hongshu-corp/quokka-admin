<template>
  <el-select :value="value" :placeholder="placeholder" filterable @change="handleInput">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value" />
  </el-select>
</template>
<script>
export default {
  name: 'SelectInput',
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleInput(selected) {
      this.$emit('input', selected)
    }
  }
}
</script>
