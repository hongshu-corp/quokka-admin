const user = {
  name: 'user',
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
        type: 'linkUpdate',
        width: '100px'
      },
      form: {
        rules: [{
          required: true,
          message: '名称是必须的',
          trigger: 'blur'
        }]
      },
      detail: true
    },
    email: {
      default: '',
      type: 'map',
      options: [{
        label: 'msn',
        value: 'tsuijy@msn.com'
      },
      {
        label: 'gmail',
        value: 'tsuijy@gmail.com'
      }],
      column: {
        minWidth: '100px'
      },
      form: {
        type: 'select',
        rules: [{
          required: true,
          message: '邮箱是必须的',
          trigger: 'blur'
        }]
      },
      detail: true
    },
    password: {
      default: '',
      type: 'password',
      form: {
        placeholder: 'please input',
        rules: [{
          required: true,
          message: '密码是必须的',
          trigger: 'blur'
        }]
      }
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
      type: 'datetime',
      detail: true
    },
    roles: {
      default: [],
      form: {
        type: 'checkbox',
        dataUrl: '/roles',
        method: 'get'
      }
    }
  }
}

export default user
