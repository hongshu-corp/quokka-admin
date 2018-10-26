<template>
  <span @click="handleCopy(display, $event)">{{ display }}</span>
</template>
<script>
import Mixin from './mixin'

export default {
  name: 'MapColumn',
  mixins: [Mixin],
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

      return index === -1 ? this.value : this.options[0].label
    }
  }
}
</script>
