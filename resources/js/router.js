import Vue from 'vue';
import VueRouter from 'vue-router';

//Components
import ChatOverview from './components/chat/ChatOverview.vue';
import ChatView from './components/chat/ChatView.vue';
import LoginComponent from './components/authentication/LoginComponent.vue';
import LoginAggr from './components/authentication/LoginAggr.vue';
import LoginComponentProvider from './components/authentication/LoginComponentProvider.vue';
import ChatProviderOverview from './components/chat/ChatProviderOverview.vue';
import DocumentOverviewComponent from './components/documents/DocumentOverviewComponent';
import ProviderDocuments from './components/documents/ProviderDocuments.vue';


import EventBus from "./services/event-bus.js";

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
      requiresAuth: true,
      requiresToBeUser: true
      
    }
  },
  {
    path: '/provider-chat',
    name: 'Chat Provider Overview',
    component: ChatProviderOverview,
    meta: {
      requiresAuth: true,
      requiresToBeProvider: true
    }
  },
  {
    path: '/communication',
    props: true,
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
        // auth.retrieveUser(self);
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
  EventBus.$emit('chatPartnerChanged');

  if (to.matched.some(record => record.meta.requiresToBeProvider)) {
    if (JSON.parse(localStorage.getItem("user")).isProvider == 1) {
      next();
    } else {
      next('/chat');
    }
  } else {
    next();
  }
  if (to.matched.some(record => record.meta.requiresToBeUser)) {
    if (JSON.parse(localStorage.getItem("user")).isProvider == 0) {
      next();
    } else {
      next('/provider-chat');
    }
  } else {
    next();
  }
  // uncomment
  // next();
});

export default router;
