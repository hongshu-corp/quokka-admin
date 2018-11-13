<template>
  <span @click="handleCopy(value, $event)">{{ display }}</span>
</template>
<script>
import clip from '../mixin/clip'

export default {
  name: 'TextColumn',
  mixins: [clip],
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
