<template>
  <div>
    <component :is="item.type" :value="getValue()" v-bind="item" />
  </div>
</template>

<script>
import TextColumn from './text'
import DatetimeColumn from './datetime'
import MapColumn from './map'

export default {
  name: 'Column',
  components: { TextColumn, DatetimeColumn, MapColumn },
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
    }
  }
}
</script>
