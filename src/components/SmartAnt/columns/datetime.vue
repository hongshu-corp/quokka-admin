<template>
  <span @click="handleCopy(display, $event)">{{ display }}</span>
</template>
<script>
import clip from '../mixin/clip'
import { parseTime } from '@/utils'

export default {
  name: 'Datetime',
  mixins: [clip],
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
