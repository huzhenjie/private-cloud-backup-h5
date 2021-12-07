export default {
  path: '/user',
  name: 'UserContainer',
  component: () => import('@/components/User'),
  children: [
    {
      path: 'gallery',
      name: 'Gallery',
      default: true,
      component: () => import('@/components/User/Gallery')
    }
  ]
}
