<template>
  <div>
    <div v-for="(item, key) in schema" :key="`d-${key}`" class="item">
      <span class="title">{{ title }}:</span>
      <component
        :is="getInputType(item)"
        :value="value[key]"
        v-bind="item" />
    </div>
  </div>
</template>

<script>
import TextDetail from './text'

export default {
  name: 'Details',
  components: { TextDetail },
  props: {
    schema: {
      type: Object,
      default: () => {}
    },
    value: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    getInputType(item) {
      return `${item.type}Detail`
    }
  }
}
</script>
