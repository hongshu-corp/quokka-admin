<template>
  <span @click="handleCopy(display, $event)">{{ display }}</span>
</template>
<script>
import clip from '../mixin/clip'

export default {
  name: 'Map',
  mixins: [clip],
  props: {
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    display: function() {
      var index = this.$_.findIndex(this.options, { value: this.value })

      return index === -1 ? this.value : this.options[index].label
    }
  }
}
</script>
