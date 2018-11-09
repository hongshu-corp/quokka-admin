<template>
  <div>
    <div v-for="(item, key) in schema" :key="key" class="item">
      <span class="title">{{ powerT(table, key) }}:</span>
      <component
        :is="getInputType(item)"
        :value="value[key]"
        v-bind="item" />
    </div>
  </div>
</template>

<script>
import TextDetail from './text'
import { powerT } from '../helpers/powerT'

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
    },
    table: {
      type: String,
      default: ''
    }
  },
  methods: {
    powerT,
    getInputType(item) {
      return `${item.type}Detail`
    }
  }
}
</script>
