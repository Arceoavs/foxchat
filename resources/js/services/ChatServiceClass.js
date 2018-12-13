import EventBus from './event-bus.js';
import Participant from '../model/participants.js';
import Message from '../model/messages.js';
import { store } from '../store.js';


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
        var path = '/api/chat/user/getinbox';
        var config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('bearer')
          }
        };
    
        var jsonsd = {
          'offset': '0',
          'take': '1000'
        }
    
        console.log('Getting Inbox');
    
        axios.post(path, jsonsd, config)
          .then(response => {
            console.log('Listing Inbox...');
            var currentProviderList = store.state.inboxForUser;
            var chatList = response.data;
            var responseList = [];
            for (var i = 0; i < currentProviderList.length; i++) {
              var responseListElem = currentProviderList[i];
              var responseChatList = [];
              for(var j = 0; j < chatList.length; j++){
                var documentChatsElem = chatList[j];
                if(responseListElem.ProviderShortName == documentChatsElem['withUser']['name']){
                  var newDocumentChatElem = new Object();
                  newDocumentChatElem = documentChatsElem['thread'];
                  responseChatList.push(newDocumentChatElem);
                }
              }
              responseListElem.documentChats=responseChatList;
              responseList.push(responseListElem);
            }
            store.commit('setUserInbox', responseList);
            
    
            console.log(responseList);
    
            console.log('Got Inbox List');
          })
          .catch(error => {
            console.log('Error getting Inbox List: ' + JSON.stringify(error));
          });
      }
          /**
     * getInbox
     */
    getInboxProvider(self){
        var path = '/api/chat/provider/getinbox';
        var config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('bearer')
          }
        };
    
        var jsonsd = {
          'offset': '0',
          'take': '1000'
        }
    
        console.log('Getting Provider Inbox');
    
        axios.post(path, jsonsd, config)
          .then(response => {
            console.log('Listing Provider Inbox...');
            console.log(response.data);
            store.commit('setProviderInbox', response.data);
    
            console.log('Got provider Inbox ');
          })
          .catch(error => {
            console.log('Error getting Provider Inbox: ' + JSON.stringify(error));
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
                self.$emit('messageWasSent');
                
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
        EventBus.$emit('loading');

        var body = {
            'username': username,
            'conversationtag': conversationTag,
            'offset': offset,
            'take': take
        }

        axios.post(this.path+'/getconversationbyname', body, configExt)
            .then(response => {
                console.log(response.data)

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

                
            })
            .catch(error => {
                console.log('error while getconversationbyname:');
                console.log(error);
                console.log(JSON.stringify(error));
                console.log(error.response.status +' '+ error.response.statusText +' message: '+ JSON.stringify(error.response.data));   
            }).finally(param => {
                EventBus.$emit('loaded');
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
