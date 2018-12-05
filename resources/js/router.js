import Vue from 'vue';
import VueRouter from 'vue-router';

//Components
import OverviewComponent from './components/OverviewComponent.vue';
import NestedComponent from './components/NestedComponent.vue';
import NestedComponent2 from './components/NestedComponent.1.vue';
import ChatOverview from './components/ChatOverview.vue';
import ChatComponent from './components/ChatComponent.vue';
import LoginComponent from './components/LoginComponent.vue';
import LoginAggr from './components/LoginAggr.vue';
import LoginComponentProvider from './components/LoginComponentProvider.vue';

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
    },
    children: [
      {
        path: 'communication',
        name: 'Communication with provider',
        component: ChatComponent
      }
    ]
  },
  {
    path: '/communication',
    name: 'Communication with provider',
    component: ChatComponent,
    meta: {
      requiresAuth: true
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
