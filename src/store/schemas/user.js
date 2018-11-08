const user = {
  name: 'user',
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
        type: 'linkUpdate',
        width: '100px'
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
    email: {
      default: '',
      column: {
        type: 'map',
        minWidth: '100px',
        options: [{
          label: 'msn',
          value: 'tsuijy@msn.com'
        },
        {
          label: 'gmail',
          value: 'tsuijy@gmail.com'
        }]
      },
      form: {
        type: 'select',
        rules: [{
          required: true,
          message: '邮箱是必须的',
          trigger: 'blur'
        }],
        options: [{
          label: 'msn',
          value: 'tsuijy@msn.com'
        },
        {
          label: 'gmail',
          value: 'tsuijy@gmail.com'
        }]
      }
    },
    password: {
      default: '',
      form: {
        type: 'password',
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
      column: {
        type: 'datetime',
        width: '140px'
      }
    },
    roles: {
      default: []
    }
  }
}

export default user
