import clip from '@/utils/clipboard'

export default {
  methods: {
    handleCopy(text, e) {
      clip(text, e)
    }
  }
}
