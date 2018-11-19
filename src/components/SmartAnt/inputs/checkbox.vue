<template>
  <el-checkbox-group
    v-model="goat"
    :disabled="disabled"
    :size="size"
    @click="handleClick"
    @change="handleChange">
    <el-checkbox v-for="option in getOptions()" :label="option[keyProperty]" :key="option[valueProperty]">{{ option[valueProperty] }}</el-checkbox>
  </el-checkbox-group>
</template>
<script>
import request from '@/utils/request'
import mixin from '../mixin/input'

export default {
  name: 'CheckboxInput',
  mixins: [mixin],
  props: {
    dataUrl: {
      type: String,
      default: null
    },
    method: {
      type: String,
      default: 'get'
    },
    value: {
      type: Array,
      default: () => []
    },
    options: {
      type: Array,
      default: () => []
    },
    keyProperty: {
      type: String,
      default: 'id'
    },
    valueProperty: {
      type: String,
      default: 'name'
    }
  },
  data() {
    return {
      dynamicOptions: []
    }
  },
  created() {
    if (this.options.length === 0 && this.dataUrl) {
      this.getData()
    }
  },
  methods: {
    handleClick(value) {
      if (typeof this.click === 'function') this.click({ value: this.text, column: this.key })
    },
    handleChange(value) {
      if (typeof this.change === 'function') this.change({ value: this.text, column: this.column })
      this.$emit('input', value)
      this.$emit('change', value)
    },
    getData() {
      request({ url: this.dataUrl, method: this.method, params: { limit: 1000 }}).then(response => {
        this.dynamicOptions = response.data.items
      })
    },
    getOptions() {
      if (this.options.length > 0) {
        var transformed = []
        for (var option in this.options) {
          transformed.push({ id: option.label || option.id, name: option.value || option.name })
        }
        return transformed
      }

      return this.dynamicOptions
    }
  }
}
</script>
