<template>
  <div>
    <div v-for="(item, key) in schema" :key="key" class="detail-item">
      <span class="detail-title">{{ powerT(table, key) }}:</span>
      <component
        :is="item.columnType"
        :value="value[key]"
        v-bind="item" />
    </div>
  </div>
</template>

<script>
import { powerT } from '../helpers/powerT'
import types from '../mixin/types'

export default {
  name: 'Details',
  mixins: [types],
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
    powerT
  }
}
</script>
