import Vue from 'vue'
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage'
 
Vue.use(MLInstaller)
 
export default new MLCreate({
  initial: 'en',
  save: process.env.NODE_ENV === 'production',
  languages: [
    new MLanguage('de').create({
      dokumente: 'Dokumente',
      chat: 'Chat',
      anmeldung: 'Anmeldung',
      login_text: 'Bitte melden Sie sich mit Ihrem foxdox Konto an:',
      provider_login: 'Zum Provider-Login',
      login_button: 'Anmelden',
      user_login: 'Zum Benutzer-Login',
      abmelden: 'Abmelden',
      general_chat: 'Allgemeiner Chat',
      add_chat: 'Chat Hinzufügen',
      chat_client_overview_title: 'Ihre Chats mit Providern',
      provider_list_title_chat_overview: "Weitere Chats",
      client_list_title_chat_overview: "Andere Provider",
      chat_hinzufuegen: "Chat hinzufügen",

    }),
 
    new MLanguage('en').create({
      dokumente: 'Documents',
      chat: 'Chat',
      anmeldung: 'Login',
      login_text: 'Please login with your foxdox Account:',
      provider_login: 'Provider-Login',
      login_button: 'Login',
      user_login: 'User-Login',
      abmelden: 'Logout',
      general_chat: 'General Chat',
      add_chat: 'Add Chat',
      chat_client_overview_title: 'Your Chats with Providers',
      provider_list_title_chat_overview: "Further Chats",
      client_list_title_chat_overview: "Further Provider",
      chat_hinzufuegen: "Add Chat",
    })
  ]
})