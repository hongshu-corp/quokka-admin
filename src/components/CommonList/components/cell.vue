<template>
  <div>
    <component :is="valueType" :value="getValue()" />
  </div>
</template>

<script>
import TextCell from './textCell'
import DatetimeCell from './datetimeCell'

export default {
  name: 'Cell',
  components: { TextCell, DatetimeCell },
  props: {
    valueType: {
      type: String,
      default: ''
    },
    value: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    getValue() {
      return this.value.key.toString()
    }
  }
}
</script>
