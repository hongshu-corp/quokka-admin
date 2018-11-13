<template>
  <span>{{ value }}</span>
</template>
<script>
export default {
  name: 'Number',
  props: {
    value: {
      type: Number,
      default: null
    }
  }
}
</script>
