<template>
  <el-date-picker
    v-model="goat"
    :name="name"
    :picker-options="options"
    :placeholder="placeholder"
    :format="format"
    :type="pickerType"
    :size="size"
    @change="handleChange" />
</template>
<script>
import mixin from '../mixin/input.js'

export default {
  name: 'DateInput',
  mixins: [mixin],
  props: {
    name: {
      type: String,
      default: ''
    },
    // eslint-disable-next-line
    value: [String, Date],
    placeholder: {
      type: String,
      default: undefined
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd'
    },
    size: {
      type: String,
      default: 'small'
    },
    options: {
      type: Object,
      default: function() {
        return {
          disabledDate(time) {
            return time.getTime() > Date.now()
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        }
      }
    },
    pickerType: {
      type: String,
      // Available types: year/month/date/dates/ week/datetime/datetimerange/daterange
      default: 'date'
    }
  },
  methods: {
    handleChange(value) {
      this.$emit('change', value)
      this.$emit('input', value)
    }
  }
}
</script>
