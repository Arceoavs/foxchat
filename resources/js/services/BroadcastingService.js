import Echo from 'laravel-echo';
import { store } from "../store.js";

class BroadcastingService {
  initialize() {
    if (!window.Echo) {
      window.Echo = new Echo({
        broadcaster: "pusher",
        key: process.env.MIX_PUSHER_APP_KEY,
        cluster: process.env.MIX_PUSHER_APP_CLUSTER,
        encrypted: true,
        auth: {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("bearer")
          }
        }
      });
    }
  }

  subscribeToChannel() {
    window.Echo.private("chat." + store.state.user.name).listen(
      ".MessageWasSent",
      e => {
        console.log(e);
        EventBus.$emit("messageWasReceived");
      }
    );
  }

  unsubscribeFromChannel() {
    window.Echo.leave("chat." + store.state.user.name);
  }
}

export default new BroadcastingService();