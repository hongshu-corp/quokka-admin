import Layout from '@/views/layout/Layout'

const userManagementRouter = {
  path: '/users',
  component: Layout,
  redirect: 'noredirect',
  name: 'userManagement',
  meta: {
    title: 'userManagement',
    icon: 'user'
  },
  children: [
    {
      path: '',
      component: () => import('@/views/users/index'),
      name: 'Userlist',
      meta: { title: 'userAll' }
    },
    {
      path: 'new',
      component: () => import('@/views/users/new'),
      name: 'CreateUser',
      hidden: true,
      meta: { title: 'createUser', icon: 'edit' }
    }
  ]
}

export default userManagementRouter
