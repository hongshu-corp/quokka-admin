<template>
  <div>
    <component :is="item.type" :value="getValue()" v-bind="item" />
  </div>
</template>

<script>
import TextCell from './textCell'
import DatetimeCell from './datetimeCell'
import MapCell from './mapCell'

export default {
  name: 'Cell',
  components: { TextCell, DatetimeCell, MapCell },
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
