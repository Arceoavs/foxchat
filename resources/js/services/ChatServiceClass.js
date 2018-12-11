import EventBus from './event-bus.js';
import Participant from '../model/participants.js';
import Message from '../model/messages.js';


const configExt = {
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+localStorage.getItem('bearer')
    }
}

export default class ChatService  {

    init(pPath){
        this.path = pPath;

        if(pPath == null){
            if(JSON.parse(localStorage.getItem('user')).isProvider == 0){
                this.path = '/api/chat/user';
            }else{
                this.path = '/api/chat/provider';
            }
        }
    }

    /**
     * getInbox
     */
    getInbox(self){
        axios.get(this.path+'/getinbox', configExt, self)
            .then(response => {
                self.response.getInbox = response;
                console.log('Get Inbox success!');
            })
            .catch(error => {
                console.log(error);                 
                console.log(JSON.stringify(error));
            });
    }

    /**
     * sendMessage
     */
    sendMessage(receivingProvider, message, conversationTag, self){
        var body = {
            'receivinguser': receivingProvider,
            'receivingprovider': receivingProvider,
            'message': message,
            'conversationtag': conversationTag
        }

        axios.post(this.path+'/sendmessage', body, configExt)
            .then(response => {
                this.getConversationByName(receivingProvider, conversationTag, 0, 100, self);
                
                console.log('Message send success!');
            })
            .catch(error => {
                console.log('error while sendmessage:');
                console.log(error);                 
                console.log(JSON.stringify(error));
                console.log(error.response.status +' '+ error.response.statusText +' message: '+ error.response.data.message);     
            });
    }

    /**
     * getConversationByProviderName
     */
    getConversationByName(username, conversationTag, offset, take, self){

        var body = {
            'username': username,
            'conversationtag': conversationTag,
            'offset': offset,
            'take': take
        }

        axios.post(this.path+'/getconversationbyname', body, configExt)
            .then(response => {

                var partner = response.data.withUser;
                var you = JSON.parse(localStorage.getItem('user'));
                self.participants = [
                    new Participant(partner.id, partner.name),
                    new Participant(you.id, you.name)
                ];

                var responseArr = self.messageList;
                responseArr.splice(0);
                for(var message of response.data.messages){
                    var sender = message.sender.name;
                    if(sender == you.name){
                        sender = 'me';
                    }
                    responseArr.push(new Message('text', sender, null, message.message, null, null, null)); 
                }

                EventBus.$emit('loadedMsg');
            })
            .catch(error => {
                console.log('error while getconversationbyname:');
                console.log(error);
                console.log(JSON.stringify(error));
                console.log(error.response.status +' '+ error.response.statusText +' message: '+ JSON.stringify(error.response.data));   
            });
    }

    /**
     * getConversationByProviderNameAll
     */
    getConversationByNameAll(username, conversationTag, self){
        var body = {
            'username': username,
            'conversationtag': conversationTag
        }

        axios.post(this.path+'/getconversationbynameall', body, configExt)
            .then(response => {
                self.response.getConversationByNameAll = response;
                console.log('getConversationByNameAll success!');
            })
            .catch(error => {
                console.log(error);                 
                console.log(JSON.stringify(error));
            });
    }

    getConversationById(userId, conversationTag, self){
        var body = {
            'userid': userId,
            'conversationtag': conversationTag
        }

        axios.post(this.path+'/getconversationbyid', body, configExt)
            .then(response => {
                self.response.getConversationById = response;
                console.log('getConversationById success!');
            })
            .catch(error => {
                console.log(error);                
                console.log(JSON.stringify(error));
            });
    }

    getConversationByIdAll(userId, conversationTag, self){
        var body = {
            'userid': userId,
            'conversationtag': conversationTag
        }

        axios.post(this.path+'/getconversationbyidall', body, configExt)
            .then(response => {
                self.response.getConversationByIdAll = response;
                console.log('getConversationByIdAll success!');
            })
            .catch(error => {
                console.log(error);                
                console.log(JSON.stringify(error));
            });
    }

    makeSeen(messageId, self){
        var body = {
            'messageid': messageId
        }

        axios.patch(this.path+'/makeseen', body, configExt)
            .then(response => {
                self.response.makeSeen = response;
                console.log('makeSeen success!');
            })
            .catch(error => {
                console.log(error);                 
                console.log(JSON.stringify(error));
            });
    }

    deleteMessage(messageId, self){
        var body = {
            'messageid': messageId
        }

        axios.patch(this.path+'/deletemessage', body, configExt)
            .then(response => {
                self.response.deleteMessage = response;
                console.log('deleteMessage success!');
            })
            .catch(error => {
                console.log(error);                 
                console.log(JSON.stringify(error));
            });
    }
}
