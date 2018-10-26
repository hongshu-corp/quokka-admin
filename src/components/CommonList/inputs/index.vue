<template>
  <div>
    <el-form-item v-for="(item, key) in schema" :key="`el-${key}`" v-bind="item">
      <component
        :is="getInputType(item)"
        :value="value[key]"
        v-bind="item"
        @input="updateForm(key, $event)" />
    </el-form-item>
  </div>
</template>

<script>
import TextInput from './text'
import SelectInput from './select'

export default {
  name: 'Inputs',
  components: { TextInput, SelectInput },
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
  data() {
    return {
      TextInput: ['text', 'password', 'email', 'date', 'datetime-local', 'number', 'tel', 'url']
    }
  },
  methods: {
    updateForm(key, newValue) {
      this.$set(this.value, key, newValue)
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
