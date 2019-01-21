import BroadcastingService from './BroadcastingService.js';
import FoxdoxGeneralService from './FoxdoxGeneralService.js';
import FolderService from './FolderService';
import ChatService from './ChatService.js';
import { store } from '../store.js';
import FoxdoxSubscriberService from './FoxdoxSubscriberService.js';


export default {
    startUserServicesWithBearer() {
        BroadcastingService.initialize();
        FoxdoxGeneralService.getProviderList();
        FolderService.getRootFolder();
    },
    startUserServicesWithUserInformation() {
        ChatService.init();
        BroadcastingService.subscribeToChannel();
    },
    removeUserServicesAndData() {
        BroadcastingService.unsubscribeFromChannel();
        localStorage.removeItem('bearer');
        localStorage.removeItem('user');
        store.dispatch('resetUserInbox');
        store.dispatch('resetUser');
        store.dispatch('resetRootFolder');
        store.dispatch('resetRecentFolders');
        store.dispatch('resetRecentDocuments');
        store.dispatch('resetMessageList');
    },
    startProviderServicesWithBearer() {
        BroadcastingService.initialize();
    },
    startProviderServicesWithUserInformation() {
        FoxdoxSubscriberService.getSubscriberList();
        ChatService.init();
        BroadcastingService.subscribeToChannel();
        ChatService.getInboxProvider();
    },
    removeProviderServicesAndData() {
        BroadcastingService.unsubscribeFromChannel();
        localStorage.removeItem('bearer');
        localStorage.removeItem('user');
        store.dispatch('resetProviderInbox');
        store.dispatch('resetUser');
        store.dispatch('resetMessageList');
        store.dispatch('resetSubscriberList');
    }
}