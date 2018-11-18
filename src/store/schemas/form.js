const form = {
  name: 'form',
  props: {
    name: {
      default: '',
      type: 'text',
      form: { }
    },
    id: {
      default: 0,
      type: 'text',
      form: {
        type: 'number',
        precision: 0,
        min: 0,
        max: 100,
        step: 2
      }
    },
    email: {
      default: false,
      type: 'switch',
      form: {
        inactiveText: 'inactive',
        activeText: 'active',
        activeValue: true,
        inactiveValue: false
      }
    }
  }
}

export default form
