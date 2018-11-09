const role = {
  name: 'role',
  props: {
    id: {
      default: undefined,
      column: {
        type: 'linkShow',
        width: '50px'
      },
      detail: {
        type: 'text'
      }
    },
    name: {
      default: '',
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
      detail: {
        type: 'text'
      }
    },
    createdTime: {
      default: '',
      column: {
        type: 'datetime',
        width: '140px'
      },
      detail: {
        type: 'datetime'
      }
    },
    updatedTime: {
      default: '',
      column: {
        type: 'datetime',
        width: '140px'
      },
      detail: {
        type: 'datetime'
      }
    }
  }
}

export default role
