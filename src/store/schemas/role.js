const role = {
  name: 'role',
  props: {
    id: {
      default: undefined,
      type: 'text',
      column: {
        type: 'linkShow',
        width: '50px'
      },
      detail: true
    },
    name: {
      default: '',
      type: 'text',
      column: {
        type: 'linkUpdate'
      },
      form: {
        type: 'text',
        rules: [{
          required: true,
          message: '名称是必须的',
          trigger: 'blur'
        }]
      },
      detail: true
    },
    createdTime: {
      default: '',
      type: 'datetime',
      column: {
        width: '140px'
      },
      detail: true
    },
    updatedTime: {
      default: '',
      type: 'datetime',
      column: {
        width: '140px'
      },
      detail: true
    }
  }
}

export default role
