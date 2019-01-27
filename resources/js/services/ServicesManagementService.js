import BroadcastingService from './BroadcastingService.js';
import FoxdoxGeneralService from './FoxdoxGeneralService.js';
import FolderService from './FolderService';
import ChatService from './ChatService.js';
import { store } from '../store.js';
import FoxdoxSubscriberService from './FoxdoxSubscriberService.js';

// This service is used to start others services which are needed
export default {
    //Starts services for user when bearer arrived
    startUserServicesWithBearer() {
        BroadcastingService.initialize();
        FoxdoxGeneralService.getProviderList();
        FolderService.getRootFolder();
    },
    //Starts services for user when User Information arrived
    startUserServicesWithUserInformation() {
        ChatService.init();
        ChatService.getInbox();
        BroadcastingService.subscribeToChannel();
    },
    //Starts services for provider when bearer arrived
    startProviderServicesWithBearer() {
        BroadcastingService.initialize();
    },
    //Starts services for provider when User Information arrived
    startProviderServicesWithUserInformation() {
        FoxdoxSubscriberService.getSubscriberList();
        ChatService.init();
        BroadcastingService.subscribeToChannel();
        ChatService.getInboxProvider();
    },
    //Remove services and data when provider logs out
    removeProviderServicesAndData() {
        BroadcastingService.unsubscribeFromChannel();
        localStorage.removeItem('bearer');
        localStorage.removeItem('user');
        store.dispatch('resetProviderInbox');
        store.dispatch('resetUser');
        store.dispatch('resetMessageList');
        store.dispatch('resetSubscriberList');
        store.dispatch('resetCommunicationUrl');
    }
}
