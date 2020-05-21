import user from '@/views/user/user'

export default {
    path: '/',
    component: user,
    children: [
        {
            path: 'user',
            name: 'user',
            component: () => import('@/views/user/user'),
            meta: {title: '用户信息', icon: '/'}
        }
    ]
}