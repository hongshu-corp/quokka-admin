<template>
  <span>{{ value }}</span>
</template>
<script>
export default {
  name: 'NumberCell',
  props: {
    value: {
      type: Number,
      default: null
    }
  }
}
</script>
