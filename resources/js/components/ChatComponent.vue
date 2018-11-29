<template>
  <div class="container myCont">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card card-default">
          <div class="card-header">Allgemeiner Chat mit d.velop</div>

          <div class="card-body">
            <ul>
              <li class="row col-md-12" v-for="message in messages" v-bind:key="message.value">
                <div class="col-md-12">
                  <div class="alert alert-chat float-left" v-if="!(message.sender == 'You')">
                    <p>{{message.sender}}:</p>
                    {{message.body}}
                  </div>
                  <div class="alert alert-chat float-right" v-else>
                    <p>{{message.sender}}:</p>
                    {{message.body}}
                  </div>
                </div>
              </li>
            </ul>
            <div class="row justify-content-center" @keyup.enter="sendMessage()">
              <input v-model="message" class="col-md-8" placeholder="Type your message here..">
              <div class="col-md-1"></div>
              <button type="button" class="btn foxcolor col-md-1" v-on:click="sendMessage()">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      messages: [
        {
          id: 1,
          body: "Ahoi Ich möchte gerne 1 Millionen Foxdox Dollar",
          sender: "You"
        },
        {
          id: 2,
          body: "Da müssten sie mir einmal ihren top Secret Foxdox Token geben",
          sender: "d.velop"
        },
        { id: 3, body: "Brauchen sie auch meinen Bank PIN?", sender: "You" },
        { id: 4, body: "Ja", sender: "d.velop" }
      ],
      message: ""
    };
  },
  methods: {
    sendMessage: function() {
      this.messages.push({ id: 5, body: this.message, sender: "You" });
      this.message = "";
    }
  },
  mounted() {
    console.log("Chat Component mounted.");
  }
};
</script>
