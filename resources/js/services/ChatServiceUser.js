import EventBus from './event-bus.js';
import participants from '../model/participants;


const configExt = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('bearer')
    }
}

var path = '/api/chat/user';

class ChatServiceUser  {

    getParticipants(){
        var partner = this.getInbox.withUser;
        var you = localStorage.getItem('user');
        return [
            new Participant(),
            new Participant(this.getInbox)
        ]
    }

    /**
     * getInbox
     */
    getInbox(){
        axios.get(path+'/getinbox', configExt)
            .then(response => {
                return response.data;
            })
            .error(error => {
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
            .error(error => {
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
            .error(error => {
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
            .error(error => {
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
            .error(error => {
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
            .error(error => {
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
            .error(error => {
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
            .error(error => {
                console.log('error');
            });
    }
}
            
const chatUser = new ChatServiceUser();
export default chatUser;