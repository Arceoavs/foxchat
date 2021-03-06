import Vue from 'vue';
import { MLInstaller, MLCreate, MLanguage } from 'vue-multilanguage';

Vue.use(MLInstaller);

/**
 * providing Multilanguage support by using vue-multilanguage package
 * and defining german and english string for each keyword
 */
export default new MLCreate({
  initial: 'Deutsch', /* Die Sprache, wenn man auf die Website kommt ist auf Deutsch gestellt*/
  save: process.env.NODE_ENV === 'production',
  languages: [
    
    //German
    new MLanguage('Deutsch').create({
      dokumente: 'Dokumente',
      chat: 'Chat',
      anmeldung: 'Anmeldung',
      login_text: 'Bitte melden Sie sich mit Ihrem foxdox Konto an:',
      provider_login: 'Zum Provider - Login',
      login_button: 'Anmelden',
      user_login: 'Zum Benutzer-Login',
      abmelden: 'Abmelden',
      general_chat: 'Allgemeiner Chat',
      add_chat: 'Chat hinzufügen',
      chat_client_overview_title: 'Ihre Chats mit Providern',
      provider_list_title_chat_overview: 'Weitere Chats',
      client_list_title_chat_overview: 'Chatübersicht',
      last_document_title_doc_overview: 'Ihre Dokumente',
      my_providers_title_doc_overview: 'Meine Provider',
      footer_message_left: 'Projektseminar: Digitaler Tresor',
      footer_message_right: 'powered by foxdox',
      your_chat: 'Chat mit: ',
      chat_list_provider: 'Weitere Chats',
      lastFiveDocsTitle: 'Zuletzt benutzt',
      keine_Provider_msg:
        'Sie haben keine Provider, die sich für den foxChat registriert haben.',
      keine_User_msg:
        'Sie haben keine Subscriber, die sich für den foxChat registriert haben.',
      willkommen_bei: 'Willkommen bei ',
      starting_chat_to_doc: 'Sie starten einen Chat zu folgendem Dokument: ',
      abbruch: 'Abbruch',
      chat_starten: 'Chat starten',
      dokument: 'Dokument ',
      being_downloaded: ' wird nun heruntergeladen. ',
      ordner: 'Ordner ',
      wird_geoeffnet: ' wird geöffnet. ',
      go_to_chat: 'Zum Chat',
      fox_username: 'foxdox-Benutzername',
      password: 'Passwort',
      benutzername: 'Benutzername',
      sprache: 'Sprache',
      impressum: 'Impressum',
      sprache_waehlen: 'Sprache wählen:',
      this_is_the_general_chat: 'Allgemeiner Chat',
      open: 'Öffnen',
      new_message_toast: 'Neue Nachricht von',
      homepage_sentence: "Willkommen bei",
      homepage_introduction: "Bitte wählen Sie Dokumente oder Chat aus, um zu beginnen.",
      hour_stamp: " Uhr",
      chat_input: "Schreiben Sie eine Antwort"
    }),

    //English
    new MLanguage('English').create({
      dokumente: 'Documents',
      chat: 'Chat',
      anmeldung: 'Login',
      login_text: 'Please login with your foxdox account:',
      provider_login: 'Provider - Login',
      login_button: 'Login',
      user_login: 'User - Login',
      abmelden: 'Logout',
      general_chat: 'General chat',
      add_chat: 'Add chat',
      chat_client_overview_title: 'Your chats with providers',
      provider_list_title_chat_overview: 'Other chats',
      client_list_title_chat_overview: 'Chat overview',
      last_document_title_doc_overview: 'Your documents',
      my_providers_title_doc_overview: 'My providers',
      footer_message_left: 'Seminar: Digital Safe',
      lastFiveDocsTitle: 'Recent documents',
      footer_message_right: 'powered by foxdox',
      your_chat: 'Chat with: ',
      chat_list_provider: 'More chats',
      chat_list_client: 'Other providers',
      keine_Provider_msg: "You don't have any registered providers in foxChat.",
      keine_User_msg:
        "You don't have any registered subscribers in foxChat.",
      willkommen_bei: 'Welcome to ',
      starting_chat_to_doc:
        'You are starting a chat with the following document: ',
      abbruch: 'Cancel',
      chat_starten: 'Start chat',
      dokument: 'Document ',
      being_downloaded: ' is now downloaded. ',
      ordner: 'Folder ',
      wird_geoeffnet: ' is opened. ',
      go_to_chat: ' go to chat ',
      fox_username: 'foxdox-username',
      password: 'Password',
      benutzername: 'Username',
      sprache: 'Language',
      impressum: 'Imprint',
      sprache_waehlen: 'Choose language:',
      this_is_the_general_chat: 'General chat',
      open: 'Open',
      new_message_toast: 'New message received from',
      homepage_sentence: "Welcome to",
      homepage_introduction: "Please choose either Documents or Chat to get started.",
      hour_stamp: " o'clock",
      chat_input: "Write a reply"
    })
  ]
});
