<template>
  <div>
    <component :is="item.type" :value="getValue()" v-bind="item" />
  </div>
</template>

<script>
import TextColumn from './textColumn'
import DatetimeColumn from './datetimeColumn'
import MapColumn from './mapColumn'

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
