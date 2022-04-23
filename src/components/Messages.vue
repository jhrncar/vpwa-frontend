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
    <div v-if="!selectedChannel.pendingInvite || true">
      <q-chat-message
        v-for="message in messages"
        :key="message.id"
        :text="[message.content]"
        :sent="isMine(message)"
        :bg-color="isMine(message) ? '' : 'dark'"
        :text-color="isMine(message) ? 'dark' : 'white'"
        :class="isMine(message) ? 'float-right' : 'float-left'"
        style="width: 60%"
      >

        <template #name>
          <span :class="isMine(message) ? 'text-primary' : 'text-dark'">{{
            message.author.username
          }}</span>
        </template>

        <template #avatar>
          <q-avatar
            class="q-message-avatar text-white"
            :class="
              isMine(message)
                ? 'q-message-avatar--sent bg-secondary'
                : 'q-message-avatar--received bg-dark'
            "
          >
            {{ message.author.username.charAt(0) }}
          </q-avatar>
        </template>
      </q-chat-message>
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
    scrollNFocus () {
      nextTick(() => {
        window.scrollTo(0, document.body.scrollHeight);
        (this.$refs.commandLine as HTMLInputElement).focus()
      })
    },
    isMine (message: SerializedMessage): boolean {
      return message.author.id === this.currentUser
    },
    async send () {
      if (this.message === '') {
        return
      }
      this.loading = true
      void await this.addMessage({ channel: this.activeChannel, message: this.message })
      this.message = ''
      this.loading = false
      this.scrollNFocus()
    },
    ...mapActions('auth', ['logout']),
    ...mapActions('channels', ['addMessage']),
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
