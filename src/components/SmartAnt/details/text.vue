<template>
  <span>{{ value }}</span>
</template>

<script>
export default {
  name: 'TextDetail',
  props: {
    value: {
      type: String,
      default: ''
    }
  }
}
</script>
