import Layout from '@/views/layout/Layout'

const securityRouter = {
  path: '/security',
  component: Layout,
  redirect: 'noredirect',
  name: 'securityManagement',
  meta: {
    title: 'securityManagement',
    icon: 'user'
  },
  children: [
    {
      path: 'users',
      component: () => import('@/views/security/users/index'),
      name: 'Userlist',
      meta: { title: 'userAll' }
    },
    {
      path: 'roles',
      component: () => import('@/views/security/roles/index'),
      name: 'Rolelist',
      meta: { title: 'roleAll' }
    },
    {
      path: 'permissions',
      component: () => import('@/views/security/permissions/index'),
      name: 'Permissionlist',
      meta: { title: 'permissionAll' }
    },
    {
      path: 'users/:id(\\d+)',
      component: () => import('@/views/security/users/show'),
      name: 'Userdetail',
      meta: { title: 'userDetail', noCache: true },
      hidden: true
    },
    {
      path: 'roles/:id(\\d+)',
      component: () => import('@/views/security/roles/show'),
      name: 'Roledetail',
      meta: { title: 'roleDetail', noCache: true },
      hidden: true
    },

    // test
    {
      path: 'test',
      component: () => import('@/views/security/users/test'),
      name: 'formtest',
      meta: { title: 'formtest' }
    }

  ]
}

export default securityRouter
