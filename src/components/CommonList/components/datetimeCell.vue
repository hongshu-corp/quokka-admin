<template>
  <span>{{ value | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
</template>
<script>
export default {
  name: 'DatetimeCell',
  props: {
    value: {
      type: String,
      default: ''
    }
  }
}
</script>
