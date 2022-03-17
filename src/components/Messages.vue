<template>
  <div class="full-width">
    <q-chat-message
      v-for="message in messages"
      :key="message.text"
      :text="[message.text]"
      :sent="message.from == 'Me' ? true : false"
      :bg-color="message.from == 'Me' ? '' : 'dark'"
      :text-color="message.from == 'Me' ? 'dark' : 'white'"
      :class="message.from == 'Me' ? 'float-right' : 'float-left'"
      style="width: 60%"
    >
      <template #name>
        <span :class="message.from == 'Me' ? 'text-primary' : 'text-dark'">{{
          message.from
        }}</span>
      </template>

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
  <q-form @submit="sendMessage" class="row full-width q-pt-md">
    <q-input
      class="col"
      v-model="message"
      outlined
      bg-color="grey-2"
      input-style="color: #424242"
      placeholder="Message..."
      autofocus
      ref="commandLine"
    >
      <template v-slot:append>
        <q-icon
          v-if="message !== ''"
          name="close"
          @click="message = ''"
          class="cursor-pointer"
        />
      </template>
    </q-input>
    <div class="column flex-center q-pl-md">
      <q-btn round dense flat color="grey-7" type="submit" icon="send" />
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Messages',
  data() {
    return {
      message: '',
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
      if (!this.message) return;
      (this.$refs.commandLine as HTMLElement).focus();
      this.messages.push({
        text: this.message,
        from: 'Me',
      });
      this.message = '';
    },
  },
});
</script>

<style scoped></style>
