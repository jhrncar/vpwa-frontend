<template>
  <div class="column col justify-end msg-container">
    <q-chat-message
      v-for="message in messages"
      :key="message.text"
      :name="message.from"
      :text="[message.text]"
      :sent="message.from == 'Me' ? true : false"
      :bg-color="message.from == 'Me' ? '' : 'dark'"
      :text-color="message.from == 'Me' ? 'dark' : 'white'"
      class="msg"
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
          D
        </q-avatar>
      </template>
    </q-chat-message>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MessageInput',

  data() {
    return {
      messages: [
        {
          text: 'Hey Daniel! How are u doing?',
          from: 'Daniel',
        },
        {
          text: 'Great! How about you?',
          from: 'Me',
        },
      ],
    };
  },
});
</script>

<style scoped>
.msg-container {
  width: 100%;
}
</style>
