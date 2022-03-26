<template>
  <div v-for="type in ['public', 'private']" :key="type">
    <q-list dense>
      <q-toolbar-title class="text-white q-mx-lg q-mt-md q-mb-xs"
        >{{ type.charAt(0).toUpperCase() + type.slice(1) }} channels
      </q-toolbar-title>
      <q-separator inset class="q-mt-xs q-mb-sm"></q-separator>
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
        </q-btn>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick } from 'vue';
import { Channel } from './models';

export default defineComponent({
  name: 'Channels',
  emits: ['closeDrawer'],
  data() {
    return {};
  },
  methods: {
    async handleSelect(selected: Channel) {
      this.selectedChannel = selected;
      if (this.$q.screen.lt.md) this.$emit('closeDrawer');
      await nextTick();
      window.scrollTo(0, document.body.scrollHeight);
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
