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
      last_document_title_doc_overview: "neueste Dokumente",
      my_providers_title_doc_overview: "meine Provider",
      footer_message_left: "Projektseminar: Digitaler Tresor",
      footer_message_right: "powered by foxdox",
      start_chat_document: "Chat starten",
      your_chat: "Ihr Chat mit Nutzer",
      chat_list_provider: "Weitere Chats",
      chat_list_client: "Andere Provider",
      keine_provider_msg: "Sie haben keine Provider, die sich für den foxChat registriert haben.",
      willkommen_bei: "Willkommen bei ",
      starting_chat_to_doc: "Sie starten einen Chat zu folgendem Dokument:",
      abbruch: "Abbruch",
      chat_starten: "Chat starten",
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
      last_document_title_doc_overview: "New Documents",
      my_providers_title_doc_overview: "My Providers",
      footer_message_left: "Seminar: Digital Safe",
      footer_message_right: "powered by foxdox",
      start_chat_document: "Start Chat",
      your_chat: 'Your chat with user',
      chat_list_provider: "More chats",
      chat_list_client: "Other providers",
      keine_Provider_msg: "You don't have any Providers that registered for foxChat.",
      willkommen_bei: "Welcome to ",
      starting_chat_to_doc: "You are starting a chat with the following document:",
      abbruch: "Cancel",
      chat_starten: "Start chat",
    })
  ]
})