<template>
  <div>
    <component
      v-bind="item"
      :is="item.columnType"
      :value="getValue()"
      :show-path="getShowRouter()"
      @pop-form="popForm" />
  </div>
</template>

<script>
import types from '../mixin/types'

export default {
  name: 'Column',
  mixins: [types],
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    model: {
      type: Object,
      default: () => {}
    },
    value: {
      type: Object,
      default: () => {}
    },
    showPath: {
      type: String,
      default: ''
    }
  },
  methods: {
    getValue() {
      return this.value.key.toString()
    },
    getShowRouter() {
      return `${this.showPath}/${this.model.id}`
    },
    popForm() {
      this.$emit('pop-form')
    }
  }
}
</script>
