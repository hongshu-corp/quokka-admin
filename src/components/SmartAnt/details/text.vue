<template>
  <span>{{ display }}</span>
</template>

<script>
export default {
  name: 'TextDetail',
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
