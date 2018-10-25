<template>
  <span>{{ display() }}</span>
</template>
<script>
export default {
  name: 'MapCell',
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
  methods: {
    display() {
      var index = this.$_.findIndex(this.options, { value: this.value })

      return index === -1 ? this.value : this.options[0].label
    }
  }
}
</script>
