import Vue from 'vue';
import VueRouter from 'vue-router';

import store from './store.js';
import OverviewComponent from './components/OverviewComponent.vue';
import ChatComponent from './components/ChatComponent.vue';
import LoginComponent from './components/LoginComponent.vue';


Vue.use(VueRouter);

const routes = [
    {
        path: '*',
        name: 'Overview',
        component: OverviewComponent,
        meta: { 
            requiresAuth: true,
        }
    },{
        path: '/login',
        name: 'Login',
        component: LoginComponent
    },{
        path: '/:partner',
        name: 'Chat with Partner',
        component: ChatComponent,
        meta: { 
            requiresAuth: true,
        }
    }
];

const router = new VueRouter({
        base: '/', 
        mode: 'history',
        routes: routes     
});


router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        console.log(store.state.user)
        if (store.state.user == null) {
            next('/login');
        } else {    
            next();
        }
    } else {
        next();
    }
    // uncomment
    next();
});

export default router;