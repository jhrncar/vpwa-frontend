<template>
  <q-infinite-scroll reverse>
    <q-card
      full-width
      class="absolute-top bg-grey-2"
      v-if="selectedChannel.pendingInvite"
    >
      <q-card-section class="row no-wrap justify-center">
        <div class="q-pr-lg">
          <div class="text-weight-bold">
            Accept invite to {{ selectedChannel.label }}
          </div>
          <div class="text-grey">From August</div>
        </div>
        <q-btn flat round icon="check" @click="acceptInvite" />
        <q-btn flat round icon="close" @click="declineInvite" />
      </q-card-section>
    </q-card>
    <span class="q-subtitle-1 q-pl-md">
      {{ activeChannel }}
    </span>
    <div v-if="!selectedChannel.pendingInvite || true">
      <q-chat-message
        v-for="message in selectedChannel.messages"
        :key="selectedChannel.messages.indexOf(message)"
        :text="[message.text]"
        :sent="message.from == 'Me' ? true : false"
        :bg-color="message.from == 'Me' ? '' : 'dark'"
        :text-color="message.from == 'Me' ? 'dark' : 'white'"
        :class="message.from == 'Me' ? 'float-right' : 'float-left'"
        style="width: 60%"
        v-show="false"
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
      <q-chat-message v-for="message in messages"
        :key="message.id"
        :name="message.author.email"
        :text="[message.content]"
        :stamp="message.createdAt"
        :sent="isMine(message)"
        style="width: 60%"
      />
    </div>

    <q-form @submit="send" class="row full-width q-pt-md">
      <q-input
        class="col"
        v-model="message"
        outlined
        bg-color="grey-2"
        input-style="color: #424242"
        placeholder="Message..."
        autofocus
        ref="commandLine"
        :disable="loading"
        @keydown.enter.prevent="send"
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
        <q-btn round dense flat color="grey-7" type="submit" icon="send" :disable="loading"/>
      </div>
    </q-form>
  </q-infinite-scroll>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue'
import { Channel } from './models'
import { SerializedMessage } from 'src/contracts'
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default defineComponent({
  name: 'MessagesComponent',
  data () {
    return {
      message: '',
      loading: false
    }
  },
  methods: {
    isMine (message: SerializedMessage): boolean {
      return message.author.id === this.currentUser
    },
    async send () {
      this.loading = true
      void await this.addMessage({ channel: this.activeChannel, message: this.message })
      this.message = ''
      this.loading = false
    },

    ...mapActions('auth', ['logout']),
    ...mapActions('channels', ['addMessage']),
    async sendMessage () { // TODO redundantne
      // TODO infinite scroll
      // if (!this.message || this.selectedChannel.pendingInvite) return;
      (this.$refs.commandLine as HTMLElement).focus()

      this.$store.commit('MainStore/insertNewMessage', {
        text: this.message,
        from: 'Me' // TODO Realne meno uzivatela, ale bude sa to zobrazovat ako Me
      })
      this.message = ''
      await nextTick()
      window.scrollTo(0, document.body.scrollHeight)
    },
    acceptInvite (): void {
      this.$store.commit('MainStore/acceptPendingInvite')
    },
    declineInvite (): void {
      this.$store.commit('MainStore/removeChannel', this.selectedChannel)
    }
  },
  computed: {
    selectedChannel: { // TODO reduntantne
      get (): Channel {
        return this.$store.state.MainStore.selectedChannel
      },
      set (val: Channel) {
        void this.$store.dispatch('MainStore/setSelectedChannel', val)
      }
    },
    activeChannel () {
      return this.$store.state.channels.active
    },
    currentUser () {
      return this.$store.state.auth.user?.id
    },
    messages (): SerializedMessage[] {
      return this.$store.getters['channels/currentMessages']
    },
    ...mapGetters('channels', {
      lastMessageOf: 'lastMessageOf'
    })
  }
})
</script>

<style scoped></style>
