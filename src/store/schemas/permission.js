const permission = {
  name: 'permission',
  props: {
    id: {
      default: undefined,
      type: 'text',
      column: {
        width: '50px'
      }
    },
    name: {
      default: '',
      type: 'text',
      column: {
        type: 'linkUpdate'
      },
      form: {
        rules: [{
          required: true,
          message: '名称是必须的',
          trigger: 'blur'
        }]
      }
    },
    createdTime: {
      default: '',
      type: 'datetime',
      column: {
        width: '140px'
      }
    },
    updatedTime: {
      default: '',
      type: 'datetime',
      column: {
        width: '140px'
      }
    }
  }
}

export default permission
