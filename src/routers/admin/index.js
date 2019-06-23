
export default {
    path: '/admin',
    component: () => import('@/views/Admin'),
    children : [
        {
           path : 'user',
           component: () => import('@/views/Admin/user'),
        },
       
        {
           path  : 'cinema',
           component: () => import('@/views/Admin/cinema'),
        },
        {
            path  : 'movie',
            component: () => import('@/views/Admin/movie'),
         },
        //  {
        //     path  : '/admin',
        //     redirect : '@/views/Admin/user'
        //  },
         
     ]
 }
 