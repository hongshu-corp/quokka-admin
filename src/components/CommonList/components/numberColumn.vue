<template>
  <span>{{ value }}</span>
</template>
<script>
export default {
  name: 'NumberColumn',
  props: {
    value: {
      type: Number,
      default: null
    }
  }
}
</script>
