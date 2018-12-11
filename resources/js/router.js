import Vue from 'vue';
import VueRouter from 'vue-router';

//Components
import DocumentOverview from './components/documents/DocumentOverview.vue';
import DocumentOverviewComponent from './components/documents/DocumentOverviewComponent'
import ChatOverview from './components/chat/ChatOverview.vue';
import ChatComponent from './components/chat/ChatComponent.vue';
import ChatView from './components/chat/ChatView.vue';
import LoginComponent from './components/authentication/LoginComponent.vue';
import LoginAggr from './components/authentication/LoginAggr.vue';
import LoginComponentProvider from './components/authentication/LoginComponentProvider.vue';
import ProviderDocuments from './components/documents/ProviderDocuments.vue';
import OwnDocuments from './components/documents/OwnDocuments.vue';
import RecentDocuments from './components/documents/RecentDocuments.vue';

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
    name: 'DocumentOverview',
    component: DocumentOverviewComponent,
    meta: {
      requiresAuth: true
    },
  },

  {
    path: '/myproviders',
    name: 'Meine Provider',
    component: ProviderDocuments
  },

  {
    path: '/mydocuments',
    name: 'Eigene Dokumente',
    component: OwnDocuments
  },

  {
    path: '/mostrecent',
    name: 'Letzte Dokumente',
    component: RecentDocuments
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
    path: '/communication',
    name: 'Communication with provider',
    component: ChatView,
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
