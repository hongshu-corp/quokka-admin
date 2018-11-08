<template>
  <span class="link-type" @click="handleClick">{{ value }}</span>
</template>
<script>
export default {
  name: 'TextColumn',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClick() {
      this.$emit('clickLinkHandler')
    }
  }
}
</script>
