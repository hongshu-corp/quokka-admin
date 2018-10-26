<template>
  <div>
    <component :is="item.type" :value="getValue()" v-bind="item" @clickLinkHandler="clickLinkHandler" />
  </div>
</template>

<script>
import TextColumn from './text'
import DatetimeColumn from './datetime'
import MapColumn from './map'
import LinkUpdateColumn from './linkUpdate'

export default {
  name: 'Column',
  components: { TextColumn, DatetimeColumn, MapColumn, LinkUpdateColumn },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    value: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    getValue() {
      return this.value.key.toString()
    },
    clickLinkHandler() {
      this.$emit('clickLinkHandler')
    }
  }
}
</script>
