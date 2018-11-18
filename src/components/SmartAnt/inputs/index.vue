<template>
  <component
    :is="getInputType(schema)"
    :value="model[prop]"
    v-bind="schema"
    @input="updateForm(prop, $event)" />
</template>

<script>
import TextInput from './text'
import SelectInput from './select'
import CheckboxInput from './checkbox'
import NumberInput from './number'

export default {
  name: 'Input',
  components: { TextInput, SelectInput, CheckboxInput, NumberInput },
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
      TextInput: ['text', 'password', 'email', 'date', 'datetime-local', 'tel', 'url']
    }
  },
  methods: {
    updateForm(key, newValue) {
      this.$set(this.model, key, newValue)
    },
    getInputType(item) {
      if (this.TextInput.includes(item.type)) {
        return 'TextInput'
      }

      return `${item.type}Input`
    }
  }
}
</script>
