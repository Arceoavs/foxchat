import Vue from 'vue';
import VueRouter from 'vue-router';

import OverviewComponent from './components/OverviewComponent.vue';
import ChatComponent from './components/ChatComponent.vue';
import LoginComponent from './components/LoginComponent.vue';
import LoginComponentProvider from './components/LoginComponentProvider.vue';
import auth from './services/AuthService.js';


Vue.use(VueRouter);

const routes = [
    {
        path: '/',
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
        path: '/provider/login',
        name: 'Login Provider',
        component: LoginComponentProvider
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
    
var self = {
        errorMsg: 'Login Fehler: ',
        showAlert: false,
        noError: true
    }

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('bearer') == null) {
            next('/login');
        } else {   
            if(localStorage.getItem('user') == null){
                auth.retrieveUser(self);
                if(self.noError){
                    next();
                }else{
                    next('login');
                }
            } else {
                next();
            } 
        }
    } else {
        next();
    }
    // uncomment
    // next();
});

export default router;