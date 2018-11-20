<template>
  <el-rate
    v-model="goat"
    :name="name"
    :icon-classes="iconClasses"
    :colors="colors"
    :max="max"
    :disabled="disabled"
    @change="handleChange" />
</template>
<script>
import mixin from '../mixin/input.js'

export default {
  name: 'SliderInput',
  mixins: [mixin],
  props: {
    value: {
      type: Number,
      default: 3
    },
    step: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 5
    },
    colors: {
      type: Array,
      default: () => ['#99A9BF', '#F7BA2A', '#FF9900']
    },
    iconClasses: {
      type: Array,
      default: () => ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3']
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
