import Vue from 'vue';
import VueRouter from 'vue-router';

//COMPONENTS
//Login
import LoginComponent from './components/authentication/LoginComponent.vue';
import LoginComponentProvider from './components/authentication/LoginComponentProvider.vue';
import LoginAggr from './components/authentication/LoginAggr.vue';
//Documents
import DocumentOverviewComponent from './components/documents/DocumentOverviewComponent';
import ProviderDocuments from './components/documents/ProviderDocuments.vue';
import FolderComponent from './components/documents/FolderComponent.vue';
import ProviderChildDocuments from './components/documents/ProviderChildDocuments.vue';
import DocumentAggr from './components/documents/DocumentAggr.vue';
//Chat
import ChatView from './components/chat/ChatView.vue';
import ChatClientOverview from './components/chat/client/ChatClientOverview.vue';
import ChatProviderOverview from './components/chat/provider/ChatProviderOverview.vue';
//Services
import auth from './services/AuthService.js';
import EventBus from './services/event-bus.js';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      redirect: { path: '/dokumente' }
    },

    {
      //aggregiert die Dokumentensicht für die router-views und breadcrumbs
      path: '/dokumente',
      component: DocumentAggr,

      children: [
        {
        path: 'provider',
        name: 'myproviders',
        component: ProviderDocuments,

        children: [{
          path: 'child',
          name: 'children',
          component: ProviderChildDocuments,
        }]
        },
        {
          path: '',
          name: 'Dokumente',
          component: DocumentOverviewComponent,
        }
      ],
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
    },
    
  ]
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
