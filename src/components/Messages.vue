<template>
  <div class="full-width">
    <q-chat-message
      v-for="message in selectedChannel.messages"
      :key="selectedChannel.messages.indexOf(message)"
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
import { Channel } from './models';

export default defineComponent({
  name: 'Messages',
  data() {
    return {
      message: '',
    };
  },
  methods: {
    sendMessage() {
      //TODO scrollnutie na koniec pri nacitani, infinite scroll
      if (!this.message) return;
      (this.$refs.commandLine as HTMLElement).focus();
      this.$store.commit('MainStore/insertNewMessage', {
        text: this.message,
        from: 'Me', //TODO Realne meno uzivatela, ale bude sa to zobrazovat ako Me
      });
      this.message = '';
    },
  },
  computed: {
    selectedChannel: {
      get(): Channel {
        return this.$store.state.MainStore.selectedChannel;
      },
      set(val: Channel) {
        void this.$store.dispatch('MainStore/setSelectedChannel', val);
      },
    },
  },
  watch: {},
});
</script>

<style scoped></style>
