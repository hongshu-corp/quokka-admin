<template>
  <div>
    <component :is="item.columnType" :value="getValue()" v-bind="item" :show-path="getShowRouter()" @clickLinkHandler="clickLinkHandler" />
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
    clickLinkHandler() {
      this.$emit('clickLinkHandler')
    },
    getShowRouter() {
      return `${this.showPath}/${this.model.id}`
    }
  }
}
</script>
