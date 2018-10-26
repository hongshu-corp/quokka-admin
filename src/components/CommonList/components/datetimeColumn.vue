<template>
  <span @click="handleCopy(display, $event)">{{ display }}</span>
</template>
<script>
import ColumnMixin from './columnMixin'
import { parseTime } from '@/utils'

export default {
  name: 'DatetimeColumn',
  mixins: [ColumnMixin],
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
