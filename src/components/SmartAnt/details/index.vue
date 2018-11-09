<template>
  <div>
    <div v-for="(item, key) in schema" :key="key" class="detail-item">
      <span class="detail-title">{{ powerT(table, key) }}:</span>
      <component
        :is="getInputType(item)"
        :value="value[key]"
        v-bind="item" />
    </div>
  </div>
</template>

<script>
import TextDetail from '../columns/text'

import DatetimeDetail from '../columns/datetime'
import MapDetail from '../columns/map'
import LinkUpdateDetail from '../columns/linkUpdate'
import LinkShowDetail from '../columns/linkShow'

import { powerT } from '../helpers/powerT'

export default {
  name: 'Details',
  components: { TextDetail, DatetimeDetail, MapDetail, LinkUpdateDetail, LinkShowDetail },
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
