import VueRouter from 'vue-router'

/*client*/
import layout from '../component/global/layout'
import student from '../component/student'
import subject from '../component/subject'


//all client side route goes here

const router = new VueRouter({
    mode: 'history',
    routes: [

        {
            path: '/', name: 'layout', component: layout, redirect: '/student', children:
                [
                    {path: '/student', name: 'student', component: student},
                    {path: '/subjects', name: 'subject', component: subject},
                ]
        },
    ],
})


export default router;
