import Vue from 'vue';
import VueRouter from 'vue-router';

//COMPONENTS
//Login
import LoginComponent from './components/authentication/LoginComponent.vue';
import LoginComponentProvider from './components/authentication/LoginComponentProvider.vue';
import LoginAggr from './components/authentication/LoginAggr.vue';
//Documents
import DocumentOverviewComponent from './components/documents/DocumentOverviewComponent';
import DocumentListComponent from './components/documents/DocumentListComponent';
import ProviderDocuments from './components/documents/ProviderDocuments.vue';
import FolderComponent from './components/documents/FolderComponent.vue';
import FolderComponentView from './components/documents/FolderComponentView.vue';
import ConfirmChatToDoc from './components/documents/ConfirmChatToDoc.vue';
//Chat
import ChatView from './components/chat/ChatView.vue';
import ChatClientOverview from './components/chat/client/ChatClientOverview.vue';
import ChatProviderOverview from './components/chat/provider/ChatProviderOverview.vue';
//Services
import auth from './services/AuthService.js';
import EventBus from './services/event-bus.js';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: { path: '/Dokumente' }
  },
  {
    path: '/Dokumente',
    name: 'DocumentOverview',
    component: DocumentOverviewComponent,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/confirm-chat',
    name: 'ConfirmChatToDocument',
    component: ConfirmChatToDoc,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: '/Provider',
    name: 'Meine Provider',
    component: ProviderDocuments,
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/Provider/:provider',
    props: true,
    component: FolderComponentView,
    meta: {
      requiresAuth: true
    }
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
    component: ChatClientOverview,
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

  if (to.matched.some(record => record.meta.requiresToBeProvider)) {
    if (JSON.parse(localStorage.getItem('user')).isProvider == 1) {
      next();
    } else {
      next('/chat');
    }
  } else {
    next();
  }
  if (to.matched.some(record => record.meta.requiresToBeUser)) {
    if (JSON.parse(localStorage.getItem('user')).isProvider == 0) {
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
