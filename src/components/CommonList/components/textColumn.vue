<template>
  <span @click="handleCopy(value, $event)">{{ value }}</span>
</template>
<script>
import ColumnMixin from './columnMixin'

export default {
  name: 'TextColumn',
  mixins: [ColumnMixin],
  props: {
    value: {
      type: String,
      default: ''
    }
  }
}
</script>
