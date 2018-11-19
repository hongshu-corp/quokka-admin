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
    },
    createdTime: {
      type: 'date',
      form: {
        placeholder: '请选择时间'
      }
    }
  }
}

export default form
