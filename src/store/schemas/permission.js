const permission = {
  name: 'permission',
  props: {
    id: {
      default: undefined,
      column: {
        type: 'text',
        width: '50px'
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
      }
    },
    createdTime: {
      default: '',
      column: {
        type: 'datetime',
        width: '140px'
      }
    },
    updatedTime: {
      default: '',
      column: {
        type: 'datetime',
        width: '140px'
      }
    }
  }
}

export default permission
