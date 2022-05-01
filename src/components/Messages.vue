<template>
  <q-infinite-scroll reverse @load="onLoad" v-show="activeChannel" :disable="disableScroll || activeChannel?.invitePending">
      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner color="primary" name="dots" size="40px" />
        </div>
      </template>

    <q-card
      full-width
      class="absolute-top bg-grey-2"
      v-if="activeChannel?.invitePending"
    >
      <q-card-section class="row no-wrap justify-center">
        <div class="q-pr-lg">
          <div class="text-weight-bold">
            Accept invite to
          </div>
          <div class="text-grey">From August</div>
        </div>
        <q-btn flat round icon="check" @click="acceptInvite" />
        <q-btn flat round icon="close" @click="declineInvite" />
      </q-card-section>
    </q-card>
    <div v-if="!activeChannel?.invitePending">
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
        <q-toolbar-title>Users in # {{activeChannel?.name}}</q-toolbar-title>
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

  <q-dialog v-model="confirmLeave">
      <q-card>
        <q-card-section>
          <div class="text-h6">Leave #{{ activeChannel?.name }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Are you sure you want to leave #{{ activeChannel?.name }}?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="dark" v-close-popup />
          <q-btn
            flat
            label="Leave"
            color="negative"
            @click="
              leaveOrDelete()
            "
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirmDelete">
      <q-card>
        <q-card-section>
          <div class="text-h6">Delete #{{ activeChannel?.name }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Are you sure you want to delete #{{ activeChannel?.name }}?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="dark" v-close-popup />
          <q-btn
            flat
            label="Delete"
            color="negative"
            @click="
              leaveOrDelete();
            "
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from 'vue'
import { Channel } from './models'
import { ChannelUser, SerializedMessage } from 'src/contracts'
import { mapActions, mapGetters } from 'vuex'
import { api } from 'src/boot/axios'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'MessagesComponent',

  setup () {
    const $q = useQuasar()
    function alert () {
      $q.dialog({
        title: 'Error',
        message: 'Error during cancellation process.'
      })
    }
    return { alert }
  },
  data () {
    return {
      message: '',
      loading: false,
      showUsers: false,
      disableScroll: false,
      confirmLeave: ref(false),
      confirmDelete: ref(false)
    }
  },
  methods: {
    // eslint-disable-next-line @typescript-eslint/ban-types
    async onLoad (index: number, done: Function) {
      if (this.activeChannel === null) {
        done()
        return
      }
      const url = '/channel/loadMore/' + this.activeChannel.name + '/' + this.numberOfMessages
      const newMessages = await api.get(url)
      if (newMessages.data.length === 0) {
        this.disableScroll = true
        done()
      } else {
        this.disableScroll = false
        await this.loadMoreMessages({ channel: this.activeChannel.name, messages: newMessages.data })
        done()
      }
    },
    scrollNFocus () {
      nextTick(() => {
        window.scrollTo(0, document.body.scrollHeight);
        (this.$refs.commandLine as HTMLInputElement).focus()
      })
    },
    isMine (message: SerializedMessage): boolean {
      return message.author.id === this.currentUser
    },
    async leaveOrDelete () {
      await this.$store.dispatch('channels/leave', this.activeChannel)
      this.confirmDelete = false
      this.confirmLeave = false
    },
    async send () {
      if (this.message === '' || !this.activeChannel) {
        return
      }
      this.loading = true
      if (this.message === '/list') {
        await this.$store.dispatch('channels/refreshChannel', this.activeChannel.name)
        this.showUsers = true
      } else if (this.message === '/cancel') {
        this.activeChannel.adminId === this.$store.state.auth.user?.id ? this.confirmDelete = true : this.confirmLeave = true
      } else if (this.message === '/invite') {
        await this.$store.dispatch('channels/invite', 'jakubtest2')
      } else {
        await this.addMessage({ channel: this.activeChannel.name, message: this.message })
      }
      this.message = ''
      this.loading = false
      this.scrollNFocus()
    },
    ...mapActions('auth', ['logout']),
    ...mapActions('channels', ['addMessage']),
    ...mapActions('channels', ['loadMoreMessages']),
    acceptInvite (): void {
      this.$store.dispatch('channels/acceptInvite', this.activeChannel)
    },
    declineInvite (): void {
      this.$store.dispatch('channels/rejectInvite', this.activeChannel)
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
    numberOfMessages (): number {
      return this.messages.length
    },
    users (): ChannelUser[] {
      return this.$store.getters['channels/currentUsers']
    },
    ...mapGetters('channels', {
      lastMessageOf: 'lastMessageOf'
    }),
    ...mapGetters('auth', {
      invites: 'channelInvites'
    })
  }
})
</script>

<style scoped></style>
