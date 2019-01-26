import Vue from 'vue';
import VueRouter from 'vue-router';

//COMPONENTS
import Homepage from './views/Homepage.vue'
//Login
import LoginComponent from './components/auth/LoginComponent.vue';
import LoginComponentProvider from './components/auth/LoginComponentProvider.vue';
import LoginAggr from './views/Login.vue';
//Documents
import DocumentOverviewComponent from './components/documents/DocumentOverviewComponent';
import FolderChild from './components/documents/FolderChildComponent.vue';
import DocumentAggr from './views/Documents.vue';
import ConfirmChatToDoc from './views/ConfirmChatToDoc.vue';
//Chat
import ChatView from './components/chat/ChatView.vue';
import ChatClientOverview from './components/chat/client/ChatOverview.vue';
import ChatProviderOverview from './components/chat/provider/ChatProviderOverview.vue';
import ChatAggr from './views/ChatAggr.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  //Hash mode erzeugt URLs mit /#/beispiel; Im Vergleich zum History Mode, müssen keine fallback Methoden
  //geschrieben werden. Allerdings ist die Indexierung bei Subroutes für Suchmaschinen wie Google problematisch.

  mode: 'hash',
  routes: [
    {
      path: '/homepage',
      name: 'Homepage',
      component: Homepage,
      meta: {
        requiresAuth: true
        // requiresToBeUser: true
      },
    },
    {
      //aggregiert die Dokumentensicht für die router-views und breadcrumbs
      //Die Komponenten werden in die Komponente DocumentAggr geladen. So müssen Funktionen, welche
      //für alle Unterkomponenten ebenfalls benötigt werden, nicht mehrfach implementiert werden.
      path: '/',
      redirect : 'Documents',
      //component: DocumentAggr,

      //es werden Subroutes mit Hilfe von children und router-views umgesetzt
      //children haben dabei grundsätzlich kein Slash im Pfad, da dies automatisch ergänzt wird


      children: []
    },
    {
      //aggregiert die Dokumentensicht für die router-views und breadcrumbs
      //Die Komponenten werden in die Komponente DocumentAggr geladen. So müssen Funktionen, welche
      //für alle Unterkomponenten ebenfalls benötigt werden, nicht mehrfach implementiert werden.
      path: '/',
      redirect: '/provider-chat/',
      //component: DocumentAggr,

      //es werden Subroutes mit Hilfe von children und router-views umgesetzt
      //children haben dabei grundsätzlich kein Slash im Pfad, da dies automatisch ergänzt wird
      meta: {
        requiresAuth: true,
        requiresToBeProvider: true
      },

      children: []
    },
    {
      path: '/Documents',
      component: DocumentAggr,
      meta: {
        requiresAuth: true,
        requiresToBeUser: true
      },
      children: [
        {
          //:name ist ein prop, welche dynamische named routes ermöglicht. In diesem Fall würde alles, das mit dem prop
          //name übergeben wird, bspw. /Documents/Fotos in der dafür vorgesehen Komponente "FolderChild" gerendert
          path: ':name',
          name: 'FolderChild',
          component: FolderChild,
          meta: {
            requiresAuth: true,
            requiresToBeUser: true
          },
        },
        {
          path: '',
          name: 'Dokumente',
          component: DocumentOverviewComponent,
          meta: {
            requiresAuth: true,
            requiresToBeUser: true
          },
        },
      ]
    },

    //Routing Teil für den Login. Hier wird ebenfalls die Grundstruktur über die LoginAggr Komponente aggregiert
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

    //Hier wird ConfirmChat zwar als root Pfad definiert, fungiert jedoch als Subroute.
    //Dies ist notwendig, da /Documents/:name definiert ist und ansonsten eine andere Komponente (in diesem Fall
    //FolderChild) gerendert würde, da die Routen entsprechend der Reihenfolge im Code priorisiert werden.
    {
      path: '/Documents/confirm-chat',
      name: 'ConfirmChatToDocument',
      component: ConfirmChatToDoc,
      meta: {
        requiresAuth: true,
        requiresToBeUser: true
      }
    },

    //Der Chat-Teil für den Client wird ebenfalls aggregiert
    {
      path: '/chat',
      component: ChatAggr,
      meta: {
        requiresAuth: true,
        requiresToBeUser: true
      },
      children: [
        {
          path: '',
          name: 'Chat Foxdox Client Overview',
          component: ChatClientOverview,
          meta: {
            requiresAuth: true,
            requiresToBeUser: true
          }
        },
        {
          path: 'communication',
          name: 'ChatViewUser',
          component: ChatView,
          meta: {
            requiresAuth: true,
            requiresToBeUser: true
          }
        }
      ]
    },

    //Es wird zwischen Provider und Client unterschieden. Hier erfolgt eine Aggregation für die Providerseite.
    {
      path: '/provider-chat',
      // name: 'Chat Provider Overview',
      component: ChatAggr,
      meta: {
        requiresAuth: true,
        requiresToBeProvider: true
      },
      children: [
        {
          path: '',
          name: 'Chat Foxdox Provider Overview',
          component: ChatProviderOverview,
          meta: {
            requiresAuth: true,
            requiresToBeProvider: true
          },
        },
        {
          path: 'communication',
          name: "ChatViewProvider",
          component: ChatView,
          meta: {
            requiresAuth: true,
            requiresToBeProvider: true
          },
        }
      ]
    },
  ]
});

//diese Variable wird für Fehler beim Login ausgegeben
var self = {
  errorMsg: 'Login Fehler: ',
  showAlert: false,
  noError: true
};

//Diese Methode prüft, ob es sich bei dem Nutzer von FoxChat um einen User oder einen Provider handelt
router.beforeEach((to, from, next) => {

  //Wenn es sich um einen User handelt und ein gültiger Token besteht, wird weitergeleitet auf den Chat, ansonsten
  //auf die Login-Seite
  if (to.matched.some(record => record.meta.requiresToBeProvider)) {
    if (localStorage.getItem('user') != null) {
      if (JSON.parse(localStorage.getItem('user')).isProvider == 1) {
        next();
      } else {
        next('/chat');
      }
    } else {
      next('/login');
    }
  } else {
    next();
  }

  //Wenn es sich um einen Provider handelt und ein gültiger Token besteht, wird weitergeleitet auf den Chat, ansonsten
  //auf die Login-Seite
  if (to.matched.some(record => record.meta.requiresToBeUser)) {
    if (localStorage.getItem('user') != null) {
      if (JSON.parse(localStorage.getItem('user')).isProvider == 0) {
        next();
      } else {
        next('/provider-chat');
      }
    } else {
      next('/login');
    }
  } else {
    next();
  }

  //Wenn kein Token für den Nutzer vorliegt, wird die auf Login-Seite weitergeleitet.
  //Wenn zu dem Nutzer kein Konto in der Datenbank vorliegt, wird ein Fehler ausgegeben und erneut
  //auf die Login-Seite weitergeleitet.
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('bearer') == null) {
      next('/login');
    } else {
      if (localStorage.getItem('user') == null) {
        // auth.retrieveUser(self);
        if (self.noError) {
          next();
        } else {
          next('/login');
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
