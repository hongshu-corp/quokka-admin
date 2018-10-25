<template>
  <span @click="handleCopy(display, $event)">{{ display }}</span>
</template>
<script>
import CellMixin from './cellMixin'
import { parseTime } from '@/utils'

export default {
  name: 'DatetimeCell',
  mixins: [CellMixin],
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
    display: function() {
      return parseTime(this.value, '{y}-{m}-{d} {h}:{i}')
    }
  }
}
</script>
