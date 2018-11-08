<template>
  <span @click="handleCopy(display, $event)">{{ display }}</span>
</template>
<script>
import Mixin from './mixin'
import { parseTime } from '@/utils'

export default {
  name: 'DatetimeColumn',
  mixins: [Mixin],
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
