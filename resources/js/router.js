import Vue from 'vue';
import VueRouter from 'vue-router';

//Components
import OverviewComponent from './components/documents/OverviewComponent.vue';
import NestedComponent from './components/documents/NestedComponent.vue';
import NestedComponent2 from './components/documents/NestedComponent.1.vue';
import ChatOverview from './components/chat/ChatOverview.vue';
import ChatView from './components/chat/ChatView.vue';
import ChatViewAggr from './components/chat/ChatViewAggr.vue';
import LoginComponent from './components/authentication/LoginComponent.vue';
import LoginAggr from './components/authentication/LoginAggr.vue';
import LoginComponentProvider from './components/authentication/LoginComponentProvider.vue';

//Services
import auth from './services/AuthService.js';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: { path: '/index' }
  },
  {
    path: '/index',
    name: 'OverviewIndex',
    component: OverviewComponent,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'nested',
        name: 'Nested',
        component: NestedComponent
      },
      {
        path: 'nestedzwei',
        name: 'Nested 2',
        component: NestedComponent2
      }
    ]
  },
  {
    path: '/login',
    component: LoginAggr,
    children: [
      {
        path: 'provider',
        name: 'Provider Login',
        component: LoginComponentProvider
      },
      {
        path: '',
        name: 'Login',
        component: LoginComponent
      }
    ]
  },
  {
    path: '/chat',
    name: 'Chat Overview',
    component: ChatOverview,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/communication/:partner',
    props: true,
    component: ChatViewAggr,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: ':tag',
        props: true,
        component: ChatView
      }
    ]
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
};

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('bearer') == null) {
      next('/login');
    } else {
      if (localStorage.getItem('user') == null) {
        auth.retrieveUser(self);
        if (self.noError) {
          next();
        } else {
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
