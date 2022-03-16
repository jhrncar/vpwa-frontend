<template>
  <div class="full-width">
    <q-chat-message
      v-for="message in messages"
      :key="message.text"
      :name="message.from"
      :text="[message.text]"
      :sent="message.from == 'Me' ? true : false"
      :bg-color="message.from == 'Me' ? '' : 'dark'"
      :text-color="message.from == 'Me' ? 'dark' : 'white'"
      :class="message.from == 'Me' ? 'float-right' : 'float-left'"
      style="width: 60%"
    >
      <template #avatar>
        <q-avatar
          class="q-message-avatar text-white"
          :class="
            message.from == 'Me'
              ? 'q-message-avatar--sent bg-secondary'
              : 'q-message-avatar--received bg-dark'
          "
        >
          {{ message.from.charAt(0) }}
        </q-avatar>
      </template>
    </q-chat-message>
  </div>
  <q-form @submit="sendMessage" class="full-width q-pt-md">
    <q-input
      v-model="newMessage"
      outlined
      bg-color="grey-2"
      input-style="color: #424242"
      placeholder="Message..."
    >
      <template v-slot:after>
        <q-btn round flat type="submit" icon="send" />
      </template>
    </q-input>
  </q-form>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Messages',

  data() {
    return {
      newMessage: '',
      messages: [
        {
          text: 'Hey Daniel! How are u doing? Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?Hey Daniel! How are u doing?',
          from: 'Daniel',
        },
        {
          text: 'Great! How about you?',
          from: 'Me',
        },
      ],
    };
  },

  methods: {
    sendMessage() {
      console.log('hello');
      this.messages.push({
        text: this.newMessage,
        from: 'Me',
      });
    },
  },
});
</script>
