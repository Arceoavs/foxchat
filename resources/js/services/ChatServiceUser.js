//import EventBus from './event-bus.js';
import Participant from '../model/participants.js';
import Message from '../model/messages.js';


const configExt = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('bearer')
    }
}

var path = '/api/chat/user';

class ChatServiceUser  {

    getParticipants(){

        this.sendMessage('mein.arbeitgeber', 'Hello myfirend', 'sometags');
        this.sendMessage('meine.versicherung', 'Hello myfirend', 'somemoreTags');

        var partner = this.getConversationByProviderName('mein.arbeitgeber', 'allgemein').withUser;
        var you = localStorage.getItem('user');
        return [
            new Participant(you.id, you.name),
            new Participant(partner.id, partner.name)
        ];
    }

    getMessages(){
        var responseArr = [];

        for(message of this.getConversationByProviderName('mein.arbeitgeber').messages){
            responseArr.concat(new Message('text', message.sender.name, null, message.message, null, null, null));
        }

        return responseArr;
    }

    /**
     * getInbox
     */
    getInbox(){
        axios.get(path+'/getinbox', configExt)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log('error');
            });
    }

    /**
     * sendMessage
     */
    sendMessage(receivingProvider, message, conversationTag){
        var body = {
            'receivingprovider': receivingProvider,
            'message': message,
            'conversationtag': conversationTag
        }

        axios.post(path+'/sendmessage', body, configExt)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log('error');
            });
    }

    /**
     * getConversationByProviderName
     */
    getConversationByProviderName(username, conversationTag){
        var body = {
            'username': username,
            'conversationtag': conversationTag
        }

        axios.post(path+'/getconversationbyprovidername', body, configExt)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log('error');
            });
    }

    /**
     * getConversationByProviderNameAll
     */
    getConversationByProviderNameAll(username, conversationTag){
        var body = {
            'username': username,
            'conversationtag': conversationTag
        }

        axios.post(path+'/getconversationbyprovidernameall', body, configExt)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log('error');
            });
    }

    getConversationByProviderId(userId, conversationTag){
        var body = {
            'userid': userId,
            'conversationtag': conversationTag
        }

        axios.post(path+'/getconversationbyproviderid', body, configExt)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log('error');
            });
    }

    getConversationByProviderIdAll(userId, conversationTag){
        var body = {
            'userid': userId,
            'conversationtag': conversationTag
        }

        axios.post(path+'/getconversationbyprovideridall', body, configExt)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log('error');
            });
    }

    makeSeen(messageId){
        var body = {
            'messageid': messageId
        }

        axios.patch(path+'/makeseen', body, configExt)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log('error');
            });
    }

    deleteMessage(messageId){
        var body = {
            'messageid': messageId
        }

        axios.patch(path+'/deletemessage', body, configExt)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                console.log('error');
            });
    }
}
            
const chatUser = new ChatServiceUser();
export default chatUser;