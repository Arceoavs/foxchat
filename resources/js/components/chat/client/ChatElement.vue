<template >
  <div class="mb-2">
    <b-card class="textColor cursorPointer" @click="informChatComponent()">
      <b-row>
        <b-col class="chatIcons textFox" cols="1" sm="2" md="1">
          <font-awesome-icon v-if="tag=='allgemein'" icon="comments" size="2x"/>
          <font-awesome-icon v-else icon="file" size="2x"/>
        </b-col>
        <b-col>
          <b-row>
            <b-col>
              <p v-if="tag=='allgemein' || !tag" class="font-weight-bold" v-text="$ml.get('general_chat')"/>
              <p v-else class="font-weight-bold">{{tag}}</p>
            </b-col>
            <b-col>
              <p
                v-if="date"
                class="font-weight-light chatDateTime text-right d-none d-md-block d-lg-block d-xl-block"
              >{{dateTimer}}</p>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <p v-if="message" class="font-weight-light text-left">{{chatMessagePreview}}</p>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

 <script>

export default {
  //This component will represent each chat in the chatoverviews, this means it needs the tag, userName, message and date, to show the related meta data.
  props: ["tag", "userName", "message", "date"],
  computed: {
    //This cuts the date to only the time.
    cuttedTime() {
      return this.date.slice(11, 16);
    },
    //This cuts the date to only the date.
    cuttedDate() {
      return this.date.slice(8, 10) + "." + this.date.slice(5, 7) + ".";
    },
    //This cuts the chat message to show only the first 70 digits of the message (message preview).
    chatMessagePreview() {
      var messagePreviewLength = 70;
      if (this.message.length > messagePreviewLength)
        return this.message.substring(0, messagePreviewLength) + "...";
      else return this.message;
    },
    //This will make sure that when the chats last activity was today, the time will be shown, else the date.
    dateTimer() {
      // Create date from input value
      var inputDate = new Date(this.date);
      // Get today's date
      var todaysDate = new Date();

      // call setHours to take the time out of the comparison
      if (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0))
        // Date equals today's date
        return this.cuttedTime;
      else return this.cuttedDate;
    }
  },
  methods: {
    //If the button will be klicked on the parents will be informed. With the needed parameters(userName and tag)
    informChatComponent: function() {
      var routeProps=new Object();
      routeProps.userName = this.userName;
      routeProps.tag=this.tag;
      this.$emit("chat-partner-changed", routeProps);
    }
  }
};
</script>
 
 <style>
.chatIcons {
  float: left;
}
.cursorPointer{
  cursor: pointer;
}
</style>
