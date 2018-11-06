import Layout from '@/views/layout/Layout'

const securityRouter = {
  path: '/users',
  component: Layout,
  redirect: 'noredirect',
  name: 'securityManagement',
  meta: {
    title: 'securityManagement',
    icon: 'user'
  },
  children: [
    {
      path: '/roles',
      component: () => import('@/views/security/roles/index'),
      name: 'Rolelist',
      meta: { title: 'roleAll' }
    },
    {
      path: '/users',
      component: () => import('@/views/security/users/index'),
      name: 'Userlist',
      meta: { title: 'userAll' }
    }
  ]
}

export default securityRouter