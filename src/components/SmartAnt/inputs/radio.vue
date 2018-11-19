<template>
  <el-radio-group
    v-model="goat"
    @click="handleClick"
    @change="handleChange">
    <template v-if="isButton">
      <el-radio-button v-for="(option, index) in getOptions()" :label="option[keyProperty]" :key="index">{{ option[valueProperty] }}</el-radio-button>
    </template>
    <template v-else>
      <el-radio v-for="(option, index) in getOptions()" :label="option[keyProperty]" :key="index">{{ option[valueProperty] }}</el-radio>
    </template>
  </el-radio-group>
</template>
<script>
import request from '@/utils/request'
import mixin from '../mixin/input'

export default {
  name: 'RadioInput',
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
    // eslint-disable-next-line
    value: [String, Number, Boolean],
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
    },
    isButton: {
      type: Boolean,
      default: false
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
