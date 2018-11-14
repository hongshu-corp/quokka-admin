<template>
  <div>
    <el-form ref="real" :rules="mergedRules" :model="value" label-position="left" label-width="70px" style="margin-left:50px;">
      <inputs :schema="elements" v-model="value" />
      <slot />
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="clickCancel">{{ $t('table.cancel') }}</el-button>
      <el-button type="primary" @click="clickOk">{{ $t('table.confirm') }}</el-button>
      <slot name="actions" />
    </div>
  </div>
</template>

<script>
import Inputs from './inputs'
import { buildFormElements, buildRules } from './helpers/builder'
import { powerT } from './helpers/powerT'

export default {
  components: { Inputs },
  props: {
    rules: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => {}
    },
    schema: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    elements: function() {
      return buildFormElements(this.schema, this.powerT)
    },
    mergedRules: function() {
      return this.$_.merge(buildRules(this.schema), this.rules)
    }
  },
  methods: {
    clickCancel() {
      this.$emit('form-cancel')
    },
    clickOk() {
      this.$refs.real.validate((valid) => {
        if (!valid) { return }
        this.$emit('form-ok')
      })
    },
    clearValidate() {
      this.$refs.real.clearValidate()
    },
    powerT
  }
}
</script>
