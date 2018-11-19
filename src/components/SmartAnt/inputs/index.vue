<template>
  <component
    :is="getInputType(schema)"
    :value="model[prop]"
    :name="prop"
    v-bind="schema"
    @input="updateForm(prop, $event)" />
</template>

<script>
import TextInput from './text'
import SelectInput from './select'
import CheckboxInput from './checkbox'
import NumberInput from './number'
import SwitchInput from './switch'
import DatetimeInput from './datetime'
import TimeInput from './time'
import SliderInput from './slider'
import RadioInput from './radio'
import RateInput from './rate'

export default {
  name: 'Input',
  components: {
    TextInput,
    SelectInput,
    CheckboxInput,
    NumberInput,
    SwitchInput,
    DatetimeInput,
    TimeInput,
    SliderInput,
    RadioInput,
    RateInput
  },
  props: {
    model: {
      type: Object,
      default: () => {}
    },
    schema: {
      type: Object,
      default: () => {}
    },
    prop: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      map: {
        TextInput: ['text', 'password', 'email', 'tel', 'url', 'textarea'],
        DatetimeInput: ['date', 'datetime']
      }
    }
  },
  methods: {
    updateForm(key, newValue) {
      this.$set(this.model, key, newValue)
    },
    getInputType(item) {
      for (var key in this.map) {
        if (this.map[key].includes(item.type)) {
          return key
        }
      }

      return `${item.type}Input`
    }
  }
}
</script>
