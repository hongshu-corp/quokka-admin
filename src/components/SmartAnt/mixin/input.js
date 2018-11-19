export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'small'
    },
    placeholder: {
      type: String,
      default: undefined
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: Infinity
    }
  },
  data() {
    return {
      // do you like this name? :-)
      goat: undefined
    }
  },
  created() {
    this.goat = this.value
  },
  watch: {
    value() {
      this.goat = this.value
    }
  }
}
