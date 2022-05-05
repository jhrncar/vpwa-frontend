<template>
  <q-toolbar-title class="text-white q-mx-lg q-mt-md"
    >Channels
    <q-btn
      round
      dense
      flat
      icon="add_circle"
      color="white"
      @click="prompt = true"
  /></q-toolbar-title>
  <q-dialog v-model="prompt">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">Create channel</div>
      </q-card-section>
      <q-card-section class="q-pt-none">
        <q-input
          dense
          clearable
          clear-icon="close"
          label="Channel name"
          v-model="channelName"
          autofocus
          :error-message="getErrorMessage('channelName')"
          :error="v$.channelName.$error"
          @keyup.enter="prompt = false"
        ></q-input>
      </q-card-section>
      <q-card-section>
        <q-option-group
          dense
          v-model="channelType"
          :options="options"
          color="primary"
          inline
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Cancel" class="text-dark" v-close-popup />
        <q-btn
          flat
          label="Create"
          class="text-primary"
          @click="createChannel()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-separator inset class="q-mt-xs" />
  <div v-for="type in [ChannelType.PUBLIC, ChannelType.PRIVATE]" :key="type" >
    <q-list dense>
      <q-toolbar-title
        class="text-white q-mx-lg text-subtitle1 text-uppercase q-mt-sm"
        >{{ type.charAt(0).toUpperCase() + type.slice(1) }}
      </q-toolbar-title>

      <q-item
        v-for="(channel) in invites"
        :key="channel.id"
        dense
      >
        <q-btn
          v-if="channel.type === type"
          dense
          class="full-width q-px-md bg-dark text-white"
          :class="{
            'bg-secondary': activeChannel === channel ? true : false,
            'text-dark': activeChannel === channel  ? false : true,
          }"
          unelevated
          no-caps
          align="left"
          @click="setActiveChannel(channel)"
        >
          <div v-if="true">
            <q-icon name="fiber_new" size="sm" class="q-pr-sm" />
          </div>
          <div class="ellipsis"># {{channel.name}}</div>
        </q-btn>
      </q-item>

      <q-item
        v-for="(channel) in channels?.filter(c => c.type === type)"
        :key="channel.id"
        dense
      >
        <q-btn
          dense
          class="full-width q-px-md"
          :class="{
            'bg-secondary': activeChannel === channel ? true : false,
            'text-white':
              activeChannel === channel
                ? true
                : false,
            'text-dark': activeChannel === channel  ? false : true,
          }"
          unelevated
          no-caps
          align="left"
          @click="setActiveChannel(channel)"
        >
          <div v-if="false">
            <q-icon name="fiber_new" size="sm" class="q-pr-sm" />
          </div>
          <div class="ellipsis"># {{channel.name}}</div>
          <q-menu touch-position context-menu v-if="!false">
            <div class="q-pa-sm bg-grey-2">
              <q-list dense style="min-width: 125px">
                <q-item
                  v-if="channel.adminId !== $store.state.auth.user.id"
                  clickable
                  v-close-popup
                  class="text-negative"
                  @click="
                    confirmLeave = true;
                    confirmChannel = channel;
                  "
                >
                  <q-item-section>Leave</q-item-section>
                </q-item>
                <q-item
                  v-if="channel.adminId === $store.state.auth.user.id"
                  clickable
                  v-close-popup
                  class="text-negative"
                  @click="
                    confirmDelete = true;
                    confirmChannel = channel;
                  "
                >
                  <q-item-section>Delete</q-item-section>
                </q-item>
                <q-separator class="q-my-xs" />
                <q-item clickable v-close-popup>
                  <q-item-section>Close</q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-menu>
        </q-btn>
      </q-item>
    </q-list>

    <q-dialog v-model="confirmLeave">
      <q-card>
        <q-card-section>
          <div class="text-h6">Leave #{{ confirmChannel.name }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Are you sure you want to leave #{{ confirmChannel.name }}?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="dark" v-close-popup />
          <q-btn
            flat
            label="Leave"
            color="negative"
            @click="
              leaveChannel();
              confirmLeave = false;
            "
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirmDelete">
      <q-card>
        <q-card-section>
          <div class="text-h6">Delete #{{ confirmChannel.name }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Are you sure you want to delete #{{ confirmChannel.name }}?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="dark" v-close-popup />
          <q-btn
            flat
            label="Delete"
            color="negative"
            @click="
              leaveChannel();
              confirmDelete = false;
            "
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from 'vue'
import { mapGetters, mapMutations } from 'vuex'
import { Channel as Chanel } from './models'
import { useQuasar } from 'quasar'
import useVuelidate from '@vuelidate/core'
import {
  minLength,
  maxLength,
  required
} from '@vuelidate/validators'
import { Channel, ChannelType } from '../contracts'

export default defineComponent({
  name: 'ChannelsComponent',
  emits: ['closeDrawer'],
  data () {
    return {
      confirmChannel: {} as Channel,
      ChannelType
    }
  },
  setup () {
    const $q = useQuasar()

    function alert () {
      $q.dialog({
        title: 'Error',
        message: 'Channel with this name already exists.'
      })
    }

    return {
      v$: useVuelidate(),
      alert,
      confirmLeave: ref(false),
      confirmDelete: ref(false),
      showPopUp: ref(false),
      prompt: ref(false),
      channelName: ref(''),
      channelType: ref(ChannelType.PUBLIC),
      options: [
        {
          label: 'Public',
          value: ChannelType.PUBLIC
        },
        {
          label: 'Private',
          value: ChannelType.PRIVATE
        }
      ]
    }
  },
  validations () {
    return {
      channelName: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(30)
      }
    }
  },
  methods: {
    ...mapMutations('channels', {
      setActiveChannel: 'SET_ACTIVE'
    }),
    async handleSelect (selected: Chanel) {
      this.selectedChannel = selected
      if (this.$q.screen.lt.md) this.$emit('closeDrawer') // TODO implementovat aj v novej verzii
      await nextTick()
      window.scrollTo(0, document.body.scrollHeight)
    },
    async leaveChannel () {
      await this.$store.dispatch('channels/leave', this.confirmChannel)
    },
    async createChannel () {
      this.v$.$touch()
      const isFormCorrect = await this.v$.$validate()
      if (isFormCorrect) {
        await this.$store.dispatch('channels/createChannel', {
          name: this.channelName,
          type: this.channelType
        }).then(() => {
          this.prompt = false
          this.channelName = ''
          this.channelType = ChannelType.PUBLIC
        }).catch(error => { if (error.response.status === 422) this.alert() })
      }
    },
    getErrorMessage (id: string): string {
      let a
      try {
        a = this.v$.$errors.reduce((previousValue, currentValue) =>
          currentValue.$property === id ? currentValue : previousValue
        ).$message
      } catch (error) {}
      if (typeof a === 'string') {
        return a
      } else {
        return ''
      }
    }
  },
  computed: {
    ...mapGetters('auth', {
      channels: 'joinedChannels',
      invites: 'channelInvites'
    }),
    activeChannel () {
      window.scrollTo(0, document.body.scrollHeight)
      return this.$store.state.channels.active
    },
    selectedChannel: {
      get (): Chanel {
        return this.$store.state.MainStore.selectedChannel
      },

      set (value: Chanel) {
        void this.$store.dispatch('MainStore/setSelectedChannel', value)
      }
    }
  }
})
</script>
