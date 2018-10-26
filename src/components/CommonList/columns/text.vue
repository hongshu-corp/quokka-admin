<template>
  <span @click="handleCopy(value, $event)">{{ value }}</span>
</template>
<script>
import Mixin from './mixin'

export default {
  name: 'TextColumn',
  mixins: [Mixin],
  props: {
    value: {
      type: String,
      default: ''
    }
  }
}
</script>
