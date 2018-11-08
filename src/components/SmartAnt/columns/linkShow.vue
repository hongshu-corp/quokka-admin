<template>
  <router-link :to="showPath" class="link-type">
    <span>{{ value }}</span>
  </router-link>
</template>
<script>
export default {
  name: 'LinkShowColumn',
  props: {
    value: {
      type: String,
      default: ''
    },
    showPath: {
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
