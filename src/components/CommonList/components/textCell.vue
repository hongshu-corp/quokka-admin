<template>
  <span @click="handleCopy(value, $event)">{{ value }}</span>
</template>
<script>
import CellMixin from './cellMixin'

export default {
  name: 'TextCell',
  mixins: [CellMixin],
  props: {
    value: {
      type: String,
      default: ''
    }
  }
}
</script>
