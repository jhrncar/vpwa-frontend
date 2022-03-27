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
          v-close-popup
          @click="createChannel()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-separator inset class="q-mt-xs" />
  <div v-for="type in ['public', 'private']" :key="type">
    <q-list dense>
      <q-toolbar-title
        class="text-white q-mx-lg text-subtitle1 text-uppercase q-mt-sm"
        >{{ type.charAt(0).toUpperCase() + type.slice(1) }}
      </q-toolbar-title>
      <q-item
        v-for="channel in channels.filter((item) => item.type == type)"
        :key="channel.id"
        dense
      >
        <q-btn
          dense
          class="full-width q-px-md"
          :class="{
            'bg-secondary': selectedChannel.id == channel.id ? true : false,
            'bg-dark': channel.pendingInvite ? true : false,
            'text-white':
              selectedChannel.id == channel.id || channel.pendingInvite
                ? true
                : false,
            'text-dark': selectedChannel.id == channel.id ? false : true,
          }"
          unelevated
          no-caps
          align="left"
          @click="handleSelect(channel)"
        >
          <div v-if="channel.pendingInvite">
            <q-icon name="fiber_new" size="sm" class="q-pr-sm" />
          </div>
          {{ channel.label }}
          <q-menu touch-position context-menu v-if="!channel.pendingInvite">
            <div class="q-pa-sm bg-grey-2">
              <q-list dense style="min-width: 125px">
                <q-item
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
                  v-if="channel.admin == $store.state.MainStore.user"
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
          <q-dialog v-model="confirmLeave" style="max-width: 500px">
            <q-card>
              <q-card-section>
                <div class="text-h6">Leave {{ confirmChannel.label }}</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                Are you sure you want to leave
                {{ confirmChannel.label }}?
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
          <q-dialog v-model="confirmDelete" style="max-width: 500px">
            <q-card>
              <q-card-section>
                <div class="text-h6">Delete {{ confirmChannel.label }}</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                Are you sure you want to delete
                {{ confirmChannel.label }}?
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="Cancel" color="dark" v-close-popup />
                <q-btn
                  flat
                  label="Delete"
                  color="negative"
                  @click="
                    deleteChannel();
                    confirmDelete = false;
                  "
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </q-btn>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref } from 'vue';
import { Channel } from './models';

export default defineComponent({
  name: 'Channels',
  emits: ['closeDrawer'],
  data() {
    return {
      confirmChannel: {} as Channel,
    };
  },
  setup() {
    return {
      confirmLeave: ref(false),
      confirmDelete: ref(false),
      prompt: ref(false),
      channelName: ref(''),
      channelType: ref('public'),
      options: [
        {
          label: 'Public',
          value: 'public',
        },
        {
          label: 'Private',
          value: 'private',
        },
      ],
    };
  },
  methods: {
    async handleSelect(selected: Channel) {
      this.selectedChannel = selected;
      if (this.$q.screen.lt.md) this.$emit('closeDrawer');
      await nextTick();
      window.scrollTo(0, document.body.scrollHeight);
    },
    leaveChannel(): void {
      this.$store.commit('MainStore/removeChannel', this.confirmChannel);
    },
    deleteChannel(): void {
      this.$store.commit('MainStore/removeChannel', this.confirmChannel);
    },
    createChannel(): void {
      void this.$store.dispatch('MainStore/createChannel', {
        label: this.channelName,
        type: this.channelType,
      });
      this.channelName = '';
    },
  },
  computed: {
    selectedChannel: {
      get(): Channel {
        return this.$store.state.MainStore.selectedChannel;
      },

      set(value: Channel) {
        void this.$store.dispatch('MainStore/setSelectedChannel', value);
      },
    },
    channels: {
      get(): Channel[] {
        return this.$store.state.MainStore.channels;
      },
      set(value: Channel) {
        this.$store.commit('MainStore/insertChannel', value);
      },
    },
  },
});
</script>
