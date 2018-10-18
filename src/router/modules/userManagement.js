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
    }
  ]
}

export default userManagementRouter
