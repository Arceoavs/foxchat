import Echo from 'laravel-echo';
import EventBus from './event-bus';
import { store } from '../store.js';


class BroadcastingService {
  initialize() {
    if (!window.Echo) {
      window.Echo = new Echo({
        broadcaster: 'pusher',
        key: process.env.MIX_PUSHER_APP_KEY,
        cluster: process.env.MIX_PUSHER_APP_CLUSTER,
        encrypted: true,
        auth: {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('bearer')
          }
        }
      });
    }
  }

  subscribeToChannel() {
    if (store.state.user.name != undefined) {
      window.Echo.private('chat.' + store.state.user.name)
        .listen(
          '.MessageWasSent',
          e => {
            console.log(e);
            EventBus.$emit('messageWasReceived', e);
          }
        )
        .listen(
          '.MessageWasRead',
          e => {
            console.log(e);
            EventBus.$emit('messageWasRead');
          }
        );
    }
  }

  unsubscribeFromChannel() {
    if (window.Echo) {
      window.Echo.leave('chat.' + store.state.user.name);
      delete window.Echo;
    }
  }
}

export default new BroadcastingService();
