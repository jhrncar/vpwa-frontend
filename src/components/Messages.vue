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

  <q-dialog v-model="showUsers">
    <div class="bg-white" style="width: 300px">
      <q-toolbar class="bg-primary text-white shadow-2">
        <q-toolbar-title>Users in # {{activeChannel}}</q-toolbar-title>
      </q-toolbar>
      <q-list class="bg-white" style="max-height: 50vh; overflow: auto">
        <q-item v-for="user in users" :key="user.id" class="q-my-sm" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              {{ user.username.charAt(0) }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1">{{ user.fullname }}</q-item-label>
            <q-item-label caption lines="1">{{ user.username }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue'
import { Channel } from './models'
import { ChannelUser, SerializedMessage } from 'src/contracts'
import { mapActions, mapGetters } from 'vuex'
import { channelService } from 'src/services'
export default defineComponent({
  name: 'MessagesComponent',
  data () {
    return {
      message: '',
      loading: false,
      showUsers: false,
      users: [] as ChannelUser[]
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
      if (this.message === '' || !this.activeChannel) {
        return
      }
      this.loading = true
      if (this.message === '/list') {
        const data = await channelService.getUsers(this.activeChannel)
        this.showUsers = true
        this.users = data
      } else {
        await this.addMessage({ channel: this.activeChannel, message: this.message })
      }
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
