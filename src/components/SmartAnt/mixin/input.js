export default {
  data() {
    return {
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
