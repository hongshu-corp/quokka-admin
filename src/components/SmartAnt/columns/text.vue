<template>
  <span @click="handleCopy(value, $event)">{{ display }}</span>
</template>
<script>
import Mixin from './mixin'

export default {
  name: 'TextColumn',
  mixins: [Mixin],
  props: {
    // eslint-disable-next-line
    value: { }
  },
  computed: {
    display() {
      if (this.value) { return this.value.toString() }

      return this.value
    }
  }
}
</script>
