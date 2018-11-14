<template>
  <span class="link-type" @click="handleClick">{{ value }}</span>
</template>
<script>
export default {
  name: 'LinkUpdate',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClick() {
      this.$emit('pop-form')
    }
  }
}
</script>
