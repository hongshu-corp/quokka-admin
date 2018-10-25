<template>
  <div>
    <el-form-item v-for="(item, key) in schema" :key="`el-${key}`" v-bind="item">
      <component
        :is="item.type"
        :value="value[key]"
        v-bind="item"
        @input="updateForm(key, $event)" />
    </el-form-item>
  </div>
</template>

<script>
import TextInput from './textInput'
import PasswordInput from './passwordInput'
import SelectInput from './selectInput'

export default {
  name: 'Inputs',
  components: { PasswordInput, TextInput, SelectInput },
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
    updateForm(key, newValue) {
      this.$set(this.value, key, newValue)
    }
  }
}
</script>
